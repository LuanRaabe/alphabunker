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
exports.SearchOwnerAccountsService = void 0;
const validators_1 = require("../validators");
const utils_1 = require("../utils");
const search_owner_accounts_1 = require("../client/dao/postgres/search_owner_accounts");
class SearchOwnerAccountsService {
    constructor() {
        this.ownerAccountsDataValidator = validators_1.OwnerAccountsDataValidator;
        this.searchAccount = search_owner_accounts_1.SearchOwnerAccount;
    }
    execute(ownerAccounts) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validOwnerAccountData = new this.ownerAccountsDataValidator(ownerAccounts);
                if (validOwnerAccountData.errors) {
                    throw new Error(`400: ${validOwnerAccountData.errors}`);
                }
                const searchOwnerAccounts = yield this.searchAccount(ownerAccounts.cpf);
                if (searchOwnerAccounts) {
                    return {
                        data: searchOwnerAccounts,
                        messages: []
                    };
                }
                return {
                    data: {},
                    messages: ["O usuário não foi encontrado"]
                };
            }
            catch (error) {
                throw new utils_1.ExceptionTreatment(error, 500, "an error occurred while searching for the owner");
            }
        });
    }
}
exports.SearchOwnerAccountsService = SearchOwnerAccountsService;
