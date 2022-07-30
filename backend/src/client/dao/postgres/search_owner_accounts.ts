/* eslint-disable @typescript-eslint/no-var-requires */
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');

async function SearchOwnerAccount(cpf: string){
   
    const clientSelect = new Client();
        
    try{
        console.log('search accounts');
        await clientSelect.connect();
        console.log('conectado ao banco');

        const selectOwnerQuery = `
            SELECT cpf, id FROM public.owners
                WHERE cpf = $1 
        `;

        const check = await clientSelect.query(selectOwnerQuery, [cpf]);
        if (check.rows.length === 0){
            await clientSelect.end();
            console.log('foi')
            return false;
        }
        const selectAccountsQuery = `
        SELECT agency, agency_digit, account, account_digit FROM public.accounts
        WHERE owners_cpf = $1
        `;
        const accountCheck = await clientSelect.query(selectAccountsQuery, [cpf]);
        const accounts = accountCheck.rows;
        if(accounts === 0){
            await clientSelect.end();
            return false;
        }
        await clientSelect.end();
        return accounts;

    }
    catch (error){
        await clientSelect.end();
        return false;
    }
}

export { SearchOwnerAccount };