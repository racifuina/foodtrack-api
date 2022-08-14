import { Router } from 'express';
import { getAll, getById } from '../controllers/FacturasController';
import isAuth from '../middlewares/Auth';

const routes = Router();

routes.get('/', isAuth, getAll);
routes.get('/:id', getById);

export default routes;