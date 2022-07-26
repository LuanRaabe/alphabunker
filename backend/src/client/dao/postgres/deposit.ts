//import { PostgresDB } from ".";
import { Deposit } from "../../../models";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import { v4 } from 'uuid';

class DepositTable{
    
    public async insert (deposit: Deposit): Promise<Object>{
        const client = new Client();
 
        try{
            await client.connect();
            console.log('conectado ao banco, pagina do deposito');
            const selectBalanceQuery = `
            SELECT * FROM public.accounts
            WHERE
                owners_cpf=$1 and 
                agency=$2 and 
                agency_digit=$3 and
                account=$4 and
                account_digit=$5

            `;
            const check = await client.query(selectBalanceQuery, [deposit.ownerCpf, deposit.agency, deposit.agencyDigit, deposit.account, deposit.accountDigit]);
            const balance = check.rows[0];
            const id = balance.id;
            const atualBalance = parseFloat(balance.balance);
            const depositValue = parseFloat(deposit.value);
            
            const fee = (depositValue * 0.01);
            const newFee = depositValue - fee;
            const newValue = atualBalance + newFee;
            
            if(newValue >= 0){
                
                const insertDepositQuery = `
                INSERT INTO public.extracts
                    (id, account_id, operation_name, value, created_at, type) 
                VALUES 
                    ( $1, $2, $3, $4, NOW(), $5 ) RETURNING id
                `;
    
                const result = await client.query(insertDepositQuery, [
                    deposit.id,
                    id,
                    'deposito',
                    deposit.value,
                    'credito'
                ]);
                if (result.rows.length !== 0){
                    console.log("primeira inserção")
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

                if (feeResult.rows.length !== 0){
                    console.log("segunda inserção")
                } 

                const alterBalance = `
                UPDATE public.accounts SET balance = balance + $1
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
                    deposit.ownerCpf,
                    deposit.agency,
                    deposit.agencyDigit,
                    deposit.account,
                    deposit.accountDigit
                ]);

                const data = {
                    deposit: {
                        id: deposit.id,
                        value:deposit.value,
                        cpf: deposit.ownerCpf,
                        agency: deposit.agency,
                        agencyDigit: deposit.agencyDigit,
                        account: deposit.account,
                        accountDigit: deposit.accountDigit,
                        createdAt: new Date()
                    },
                    fee: {
                        id: feeId,
                        value: passFee,
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

export { DepositTable };