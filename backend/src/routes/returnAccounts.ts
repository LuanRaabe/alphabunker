import { SearchOwnerAccounts } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/search')
    .post(new SearchOwnerAccounts().handle.bind(new SearchOwnerAccounts()));



export default route;