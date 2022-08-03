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
exports.SearchLoginService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const login_1 = require("../client/dao/postgres/login");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
class SearchLoginService {
    constructor() {
        this.loginValidator = validators_1.LoginValidator;
        this.searchLogin = login_1.LoginDB;
    }
    execute(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validLogin = new this.loginValidator(login);
                if (validLogin.errors) {
                    throw new Error(`400: ${validLogin.errors}`);
                }
                const findLogin = yield this.searchLogin(login.cpf, login.password);
                if (findLogin) {
                    const token = (0, jsonwebtoken_1.sign)({ findLogin }, config_1.auth.secret, {
                        expiresIn: config_1.auth.expires,
                    });
                    return {
                        data: {
                            account: findLogin.account,
                            owner: findLogin.owner,
                            token: token,
                        },
                        messages: [],
                    };
                }
                return {
                    data: {},
                    messages: ["Conta não encontrada"],
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while searching for the owner");
            }
        });
    }
}
exports.SearchLoginService = SearchLoginService;
