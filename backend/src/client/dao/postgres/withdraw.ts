import { PostgresDB } from ".";
import { Withdraw } from "../../../models";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';

class WithdrawTable extends PostgresDB{
    
    public async insert (withdraw: Withdraw): Promise<Object>{
        const client = new Client();
 
        try{
            await client.connect();
            console.log('conectado ao banco');
            const selectBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
                owners_cpf=$1 and 
                agency=$2 and 
                agency_digit=$3 and
                account=$4 and
                account_digit=$5

            `;
            const check = await client.query(selectBalanceQuery, [withdraw.ownerCpf, withdraw.agency, withdraw.agencyDigit, withdraw.account, withdraw.accountDigit]);
            const compare = bcrypt.compareSync(withdraw.password, check.rows[0].password);
            if(!compare){
                return false;
            }
            const balance = check.rows[0];
            const id = balance.id;
            const atualBalance = parseFloat(balance.balance);
            const withdrawValue = parseFloat(withdraw.value);
            
            const fee = 4;
            const newFee = withdrawValue + fee;
            const newValue = atualBalance - newFee;
            
            if(newValue >= 0){
                console.log('entrou')
                
                const insertWithdrawQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at, type) 
                VALUES 
                    ( $1, $2, $3, $4, NOW(), $5 ) RETURNING id
                `;
    
                const result = await client.query(insertWithdrawQuery, [
                    withdraw.id,
                    id,
                    'saque',
                    withdraw.value,
                    'debito'
                ]);

                console.log(result.rows)
                if (result.rows.length !== 0){
                    console.log("primeiro ok")
                }

                const insertFeeQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at, type) 
                VALUES 
                    ( $1, $2, $3, $4, NOW(), $5 ) RETURNING id
                `;

                const passFee = String(fee);
                const feeId = v4();
                
                const feeResult = await client.query(insertFeeQuery, [
                    feeId,
                    id,
                    'taxa',
                    passFee,
                    'debito'
                ]);

                console.log(feeResult.rows)
                if (feeResult.rows.length !== 0){
                    console.log("segundo ok")
                } 

                const alterBalance = `
                UPDATE public.accounts SET balance = balance - $1
                WHERE
                    owners_cpf=$2 and 
                    agency=$3 and 
                    agency_digit=$4 and
                    account=$5 and
                    account_digit=$6
                    RETURNING balance
                `;
                
                const final = await client.query(alterBalance, [
                    newFee,
                    withdraw.ownerCpf,
                    withdraw.agency,
                    withdraw.agencyDigit,
                    withdraw.account,
                    withdraw.accountDigit
                ]);
                console.log('withdraw completo')

                const data = {
                    withdraw: {
                        id: withdraw.id,
                        value:withdraw.value,
                        cpf: withdraw.ownerCpf,
                        agency: withdraw.agency,
                        agencyDigit: withdraw.agencyDigit,
                        account: withdraw.account,
                        accountDigit: withdraw.accountDigit,
                        createdAt: new Date()
                    },
                    fee: {
                        id: feeId,
                        value: passFee
                    }
                }

                await client.end();
        
                    return data;     
            }

            return false;           
        }
        catch (error){
            
            await client.end();
            throw new Error("503: service temporarily unavailable");
        }      
    }
}

export { WithdrawTable };