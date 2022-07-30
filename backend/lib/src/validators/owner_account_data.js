"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerAccountsDataValidator = void 0;
const _1 = require(".");
class OwnerAccountsDataValidator {
    constructor(ownerAccounts) {
        this.nameValidator = _1.NameValidator;
        this.cpfValidator = _1.CPFValidator;
        this.errors = '';
        this.owner = this.validation(ownerAccounts);
    }
    validation(ownerAccounts) {
        const validName = new this.nameValidator(ownerAccounts.name);
        const validCpf = new this.cpfValidator(ownerAccounts.cpf);
        this.errors = this.errors.concat(`${validName.errors}${validCpf.errors}`);
        const ownerAccountsData = {
            name: validName.name,
            cpf: validCpf.cpf
        };
        return ownerAccountsData;
    }
}
exports.OwnerAccountsDataValidator = OwnerAccountsDataValidator;
