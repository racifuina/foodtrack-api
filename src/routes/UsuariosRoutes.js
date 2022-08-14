import { Router } from 'express';
import { autenticar, infoUsuario, getAll, create, getById, updateById, deleteById, solicitarRecuperarPassword, cambiarPassword } from '../controllers/UsuariosController';
import isAuth from '../middlewares/Auth';

const routes = Router();

routes.post('/autenticar', autenticar);
routes.post('/recuperar-password', solicitarRecuperarPassword);
routes.post('/cambiar-password', cambiarPassword);
routes.get('/mi-usuario', isAuth, infoUsuario);
routes.get('/', isAuth, getAll);
routes.post('/', isAuth, create);
routes.get('/:id', isAuth, getById);
routes.post('/:id', isAuth, updateById);
routes.delete('/:id', isAuth, deleteById);

export default routes;