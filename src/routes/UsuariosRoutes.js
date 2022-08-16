import { Router } from 'express';
import { autenticar, solicitarRecuperarPassword, cambiarPassword } from '../controllers/UsuariosController';

const routes = Router();

routes.post('/autenticar', autenticar);
routes.post('/recuperar-password', solicitarRecuperarPassword);
routes.post('/cambiar-password', cambiarPassword);

export default routes;