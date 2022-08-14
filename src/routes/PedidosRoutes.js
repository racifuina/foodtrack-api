import { Router } from 'express';
import { getAll, getAllForCocina, getAllForMensajeria, create, getById, updateById, deleteById, changeStatusById, getChangelogById } from '../controllers/PedidosController';
import isAuth from '../middlewares/Auth';

const routes = Router();

routes.get('/', isAuth, getAll);
routes.get('/cocina', isAuth, getAllForCocina);
routes.get('/mensajeria', isAuth, getAllForMensajeria);
routes.post('/', isAuth, create);
routes.get('/:id/changelog', getChangelogById);
routes.get('/:id', isAuth, getById);
routes.post('/:id/cambiar-estado', isAuth, changeStatusById);
routes.post('/:id', isAuth, updateById);
routes.delete('/:id', isAuth, deleteById);

export default routes;