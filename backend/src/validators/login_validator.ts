import { CPFValidator } from '.';
import { PasswordValidator } from '.';
import { Login } from '../models';

class LoginValidator{
    public login: Partial<Login>;
    public errors: string;

    private cpfValidator = CPFValidator;
    private passwordValidator = PasswordValidator;

    public constructor(login: Login){
        this.errors = '';
        this.login = this.validation(login);
    }

    private validation(login: Login): Partial<Login>{

        const validCpf = new this.cpfValidator(login.cpf);
        const validPassword = new this.passwordValidator(login.password);

        this.errors = this.errors.concat(`${validCpf.errors}`);

        const loginData: Partial<Login> = {
            cpf: validCpf.cpf,
            password: validPassword.password
        }

        return loginData;
    }
}

export { LoginValidator };