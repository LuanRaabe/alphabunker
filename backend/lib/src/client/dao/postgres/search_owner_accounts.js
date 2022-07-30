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
exports.SearchOwnerAccount = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Client } = require('pg');
function SearchOwnerAccount(cpf) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientSelect = new Client();
        try {
            console.log('search accounts');
            yield clientSelect.connect();
            console.log('conectado ao banco');
            const selectOwnerQuery = `
            SELECT cpf, id FROM public.owners
                WHERE cpf = $1 
        `;
            const check = yield clientSelect.query(selectOwnerQuery, [cpf]);
            if (check.rows.length === 0) {
                yield clientSelect.end();
                console.log('foi');
                return false;
            }
            const selectAccountsQuery = `
        SELECT agency, agency_digit, account, account_digit FROM public.accounts
        WHERE owners_cpf = $1
        `;
            const accountCheck = yield clientSelect.query(selectAccountsQuery, [cpf]);
            const accounts = accountCheck.rows;
            if (accounts === 0) {
                yield clientSelect.end();
                return false;
            }
            yield clientSelect.end();
            return accounts;
        }
        catch (error) {
            yield clientSelect.end();
            return false;
        }
    });
}
exports.SearchOwnerAccount = SearchOwnerAccount;
