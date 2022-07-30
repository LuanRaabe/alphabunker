import { NameValidator, CPFValidator } from '.';
import { OwnerAccounts } from '../models';

class OwnerAccountsDataValidator{
    public owner: Partial<OwnerAccounts>;
    public errors: string;

    private nameValidator = NameValidator;
    private cpfValidator = CPFValidator;

    public constructor(ownerAccounts: OwnerAccounts){
        this.errors = '';
        this.owner = this.validation(ownerAccounts);
    }

    private validation(ownerAccounts: OwnerAccounts): Partial<OwnerAccounts>{

        const validName = new this.nameValidator(ownerAccounts.name);
        const validCpf = new this.cpfValidator(ownerAccounts.cpf);

        this.errors = this.errors.concat(`${validName.errors}${validCpf.errors}`);

        const ownerAccountsData: Partial<OwnerAccounts> = {
            name: validName.name,
            cpf: validCpf.cpf
        }

        return ownerAccountsData;
    }
}

export { OwnerAccountsDataValidator };