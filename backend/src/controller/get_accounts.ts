import { Request, Response } from 'express';
import { SearchOwnerAccountsService } from '../services';
import { CreateResponse } from '../utils';

class SearchOwnerAccounts{

    private checkOwnerAccountsService = SearchOwnerAccountsService;
    private createResponse = CreateResponse;

    public async handle(req: Request, res: Response){

        try{
            const response = await new this.checkOwnerAccountsService().execute(req.body);
            this.createResponse.success(res, 201, response);
        }
        catch(err){
            this.createResponse.error(res, err as Error);
        }
    }
}

export { SearchOwnerAccounts };