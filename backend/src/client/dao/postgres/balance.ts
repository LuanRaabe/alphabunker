import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import bcrypt from 'bcrypt';

async function CheckBalance(cpf: string, password:string, agency: string, agency_digit: string, account: string, account_digit:string){
   
    const clientSelect = new Client();
        
    try{
        console.log('procurando usuario');
        await clientSelect.connect();
        console.log('conectado ao banco, pagina de saldo');

        const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
            owners_cpf=$1 and 
            agency=$2 and 
            agency_digit=$3 and
            account=$4 and
            account_digit=$5
        `;
        const check = await clientSelect.query(selectBalanceQuery, [cpf, agency, agency_digit, account, account_digit]);
        const balance = check.rows[0];
        if(balance === 0){
            return false;
        }
        const compare = bcrypt.compareSync(password, balance.password);
        const newValue = parseFloat(balance.balance).toFixed(2);
        //console.log(compare)
        if (compare){
            const selectOwner = `
            SELECT name FROM public.owners
            WHERE
                cpf=$1
            `;
            const checkName = await clientSelect.query(selectOwner, [cpf]);
            const name = checkName.rows[0].name;
            await clientSelect.end();
            if(name !== 0){
                const data = {
                    id: balance.id,
                    name: name,
                    owners_cpf: balance.owners_cpf,
                    agency: balance.agency,
                    agency_digit: balance.agency_digit,
                    account: balance.account,
                    account_digit: balance.account_digit,
                    balance: newValue
                }
                return data;
            }
        }
        
        return false;
    }
    catch (error){
        
        await clientSelect.end();
        return false;
    }
}

export { CheckBalance };