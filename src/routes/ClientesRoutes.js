import { Router } from 'express';
import { getAll, create, getById, updateById, deleteById, validarNit } from '../controllers/ClientesController';
import isAuth from '../middlewares/Auth';

const routes = Router();

routes.get('/', isAuth, getAll);
routes.get('/validar-nit/:nitCliente', isAuth, validarNit);
routes.post('/', isAuth, create);
routes.get('/:id', isAuth, getById);
routes.post('/:id', isAuth, updateById);
routes.delete('/:id', isAuth, deleteById);

export default routes;
