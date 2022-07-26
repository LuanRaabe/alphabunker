import Owner from './owner';
import Account from './account';
import Balance from './balance';
import Deposit from './deposit';
import express from 'express';
import Withdraw from './withdraw';
import Extract from './extract';
import Transfer from './transfer';
import ReturnAccounts from './returnAccounts';
import Login from './login';
import cors from 'cors';


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(Owner);
app.use(Account);
app.use(Login);
app.use(Balance);
app.use(Deposit);
app.use(Withdraw); 
app.use(Extract); 
app.use(Transfer);
app.use(ReturnAccounts);

export default app;