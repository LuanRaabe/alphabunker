import { Request, Response } from 'express';
import { SearchLoginService } from '../services';
import { CreateResponse } from '../utils';


class MakeLogin{

    private loginService = SearchLoginService;
    private createResponse = CreateResponse;

    public async handle(req: Request, res: Response){

        try{
            const response = await new this.loginService().execute(req.body);
            this.createResponse.success(res, 201, response);
        }
        catch(err){
            this.createResponse.error(res, err as Error);
        }
    }
}

export { MakeLogin };