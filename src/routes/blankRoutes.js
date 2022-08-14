import { Router } from 'express';
import { getAll, create, getById, updateById, deleteById } from '../controllers/RolesController';
import isAuth from '../middlewares/Auth';

const routes = Router();

routes.get('/', isAuth, getAll);
routes.post('/', isAuth, create);
routes.get('/:id', isAuth, getById);
routes.post('/:id', isAuth, updateById);
routes.delete('/:id', isAuth, deleteById);

export default routes;