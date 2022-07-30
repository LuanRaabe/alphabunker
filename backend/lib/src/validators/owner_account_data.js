"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerAccountsDataValidator = void 0;
const _1 = require(".");
class OwnerAccountsDataValidator {
    constructor(ownerAccounts) {
        this.cpfValidator = _1.CPFValidator;
        this.errors = '';
        this.owner = this.validation(ownerAccounts);
    }
    validation(ownerAccounts) {
        const validCpf = new this.cpfValidator(ownerAccounts.cpf);
        this.errors = this.errors.concat(`${validCpf.errors}`);
        const ownerAccountsData = {
            cpf: validCpf.cpf
        };
        return ownerAccountsData;
    }
}
exports.OwnerAccountsDataValidator = OwnerAccountsDataValidator;
