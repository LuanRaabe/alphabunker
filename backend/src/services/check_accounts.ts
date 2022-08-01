import { APIResponse, OwnerAccounts } from '../models';
import { OwnerAccountsDataValidator } from '../validators';
import { ExceptionTreatment } from "../utils";
import { SearchOwnerAccount } from '../client/dao/postgres/search_owner_accounts';
import { Jwt } from 'jsonwebtoken';

class SearchOwnerAccountsService{

    private ownerAccountsDataValidator = OwnerAccountsDataValidator;
    private searchAccount = SearchOwnerAccount;

    public async execute(ownerAccounts: OwnerAccounts): Promise<APIResponse> {

        try{
            const validOwnerAccountData = new this.ownerAccountsDataValidator(ownerAccounts);

            if(validOwnerAccountData.errors){
                throw new Error(`400: ${validOwnerAccountData.errors}`);
            }

            const searchOwnerAccounts = await this.searchAccount(ownerAccounts.cpf);
            console.log(searchOwnerAccounts);

            if(searchOwnerAccounts){
                return {
                    data: searchOwnerAccounts,
                    messages: []
                    
                } as APIResponse;
            }
            return {
                data: {},
                messages: [ "O usuário não foi encontrado" ]
            } as APIResponse;

        }
        catch(error){
            throw new ExceptionTreatment(
                error as Error,
                500,
                "an error occurred while searching for the owner"
            );
        }        
    }
}

export { SearchOwnerAccountsService };