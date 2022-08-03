"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
const bcrypt_1 = __importDefault(require("bcrypt"));
function LoginDB(cpf, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSelect = new Client();
        try {
            console.log('começando login');
            yield clientSelect.connect();
            console.log('conectado ao banco');
            const selectOwnerQuery = `
            SELECT * FROM public.accounts
                WHERE owners_cpf = $1
        `;
            const check = yield clientSelect.query(selectOwnerQuery, [cpf]);
            const passwords = check.rows;
            let account;
            for (let i = 0; i < passwords.length; i++) {
                const compare = bcrypt_1.default.compareSync(password, passwords[i].password);
                if (compare) {
                    account = passwords[i];
                }
            }
            // console.log(account)
            const getOwner = `
            SELECT * FROM public.owners
                WHERE cpf = $1
        `;
            const ownerQuery = yield clientSelect.query(getOwner, [cpf]);
            const owner = ownerQuery.rows[0];
            yield clientSelect.end();
            if (!owner) {
                return false;
            }
            if (account) {
                return {
                    owner: {
                        name: owner.name,
                        email: owner.email,
                        birthdate: owner.birthdate,
                    },
                    account: {
                        id: account.id,
                        owners_cpf: owner.cpf,
                        agency: account.agency,
                        agency_digit: account.agency_digit,
                        account: account.account,
                        account_digit: account.account_digit,
                        balance: account.balance.toFixed(2),
                    }
                };
            }
            return false;
        }
        catch (error) {
            yield clientSelect.end();
            return false;
        }
    });
}
exports.LoginDB = LoginDB;
