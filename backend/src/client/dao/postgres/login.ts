import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import bcrypt from 'bcrypt';

async function LoginDB(cpf: string, password: string){
   
    const clientSelect = new Client();
        
    try{
        console.log('começando login');
        await clientSelect.connect();
        console.log('conectado ao banco');

        const selectOwnerQuery = `
            SELECT * FROM public.accounts
                WHERE owners_cpf = $1
        `;

        const check = await clientSelect.query(selectOwnerQuery, [cpf]);
        const passwords = check.rows;
        let account;
        for(let i = 0; i < passwords.length; i++){
            const compare = bcrypt.compareSync(password, passwords[i].password);
            if(compare){
                account = passwords[i];
            }
        }
        
        console.log(account)

        const getOwner = `
            SELECT * FROM public.owners
                WHERE cpf = $1
        `;
        const ownerQuery = await clientSelect.query(getOwner, [cpf]);
        const owner = ownerQuery.rows[0];
        
        await clientSelect.end();
        
        if(!owner){
            return false;
        }
        
        if (account){
            return {
                id: account.id,
                name: owner.name,
                email: owner.email,
                birthdate: owner.birthdate,
                owners_cpf: account.cpf,
                agency: account.agency,
                agency_digit: account.agency_digit,
                account: account.account,
                account_digit: account.account_digit,
                balance: account.balance.toFixed(2),
            };
        }
        return false
    }
    catch (error){
        await clientSelect.end();
        return false;
    }
}

export { LoginDB };