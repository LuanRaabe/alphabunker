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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBalanceService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const login_1 = require("../client/dao/postgres/login");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
class SearchBalanceService {
    constructor() {
        this.balanceDataValidator = validators_1.BalanceDataValidator;
        this.balanceTable = login_1.CheckBalance;
    }
    execute(balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validBalanceData = new this.balanceDataValidator(balance);
                if (validBalanceData.errors) {
                    throw new Error(`400: ${validBalanceData.errors}`);
                }
                const searchBalance = yield this.balanceTable(balance.ownerCpf, balance.password, balance.agency, balance.agencyDigit, balance.account, balance.accountDigit);
                console.log(searchBalance);
                if (searchBalance) {
                    const token = (0, jsonwebtoken_1.sign)({ searchBalance }, config_1.auth.secret, {
                        expiresIn: config_1.auth.expires
                    });
                    return {
                        data: {
                            account: searchBalance,
                            token: token
                        },
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["an error occurred while searching for the account"]
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while searching for the account");
            }
        });
    }
}
exports.SearchBalanceService = SearchBalanceService;
