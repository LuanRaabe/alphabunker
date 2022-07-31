import { MakeDeposit } from '../controller';
import { Router } from 'express';
import { verifyToken } from '../utils';

const route = Router();

route.route('/deposit')
    .post(new MakeDeposit().handle.bind(new MakeDeposit()));



export default route;