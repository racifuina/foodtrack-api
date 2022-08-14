import { Router } from 'express';
import { getAll, create } from '../controllers/RolesPermisosController';
import isAuth from '../middlewares/Auth';

const routes = Router();

routes.get('/', isAuth, getAll);
routes.post('/', isAuth, create);

export default routes;