"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginValidator = void 0;
const _1 = require(".");
const _2 = require(".");
class LoginValidator {
    constructor(login) {
        this.cpfValidator = _1.CPFValidator;
        this.passwordValidator = _2.PasswordValidator;
        this.errors = '';
        this.login = this.validation(login);
    }
    validation(login) {
        const validCpf = new this.cpfValidator(login.cpf);
        const validPassword = new this.passwordValidator(login.password);
        this.errors = this.errors.concat(`${validCpf.errors}`);
        const loginData = {
            cpf: validCpf.cpf,
            password: validPassword.password
        };
        return loginData;
    }
}
exports.LoginValidator = LoginValidator;
