import { MakeLogin } from '../controller';
import { Router } from 'express';

const route = Router();

route.route('/login')
    .post(new MakeLogin().handle.bind(new MakeLogin()));



export default route;