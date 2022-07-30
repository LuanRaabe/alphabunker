import { CPFValidator } from '.';
import { OwnerAccounts } from '../models';

class OwnerAccountsDataValidator{
    public owner: Partial<OwnerAccounts>;
    public errors: string;

    private cpfValidator = CPFValidator;

    public constructor(ownerAccounts: OwnerAccounts){
        this.errors = '';
        this.owner = this.validation(ownerAccounts);
    }

    private validation(ownerAccounts: OwnerAccounts): Partial<OwnerAccounts>{

        const validCpf = new this.cpfValidator(ownerAccounts.cpf);

        this.errors = this.errors.concat(`${validCpf.errors}`);

        const ownerAccountsData: Partial<OwnerAccounts> = {
            cpf: validCpf.cpf
        }

        return ownerAccountsData;
    }
}

export { OwnerAccountsDataValidator };