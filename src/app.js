import express, { json } from 'express';
import morgan from 'morgan';
import moment from 'moment';
import ErrorHandler from './middlewares/ErrorHandler';
import options from '../package.json';
import UsuariosRoutes from './routes/UsuariosRoutes';
import EmpleadosRoutes from './routes/EmpleadosRoutes';
import ProductosRoutes from './routes/ProductosRoutes';
import ClientesRoutes from './routes/ClientesRoutes';
import RolesRoutes from './routes/RolesRoutes';
import PedidosController from './routes/PedidosRoutes';
import PuestosRoutes from './routes/PuestosRoutes';
import PermisosRoutes from './routes/PermisosRoutes';
import TiposAutorizacionesRoutes from './routes/TiposAutorizacionesRoutes';
import RolesPermisosRoutes from './routes/RolesPermisosRoutes';
import FacturasRoutes from './routes/FacturasRoutes';

const startupDate = moment().format("DD-MM-YYYY HH:mm")
const app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, Content-Type, X-Auth-Token');
    next();
});

//MIDDLEWARES 
app.enable('trust proxy');
app.use(morgan('dev'));
app.use(json());

//ROUTES
app.get('/', (req, res) => {
    const host = req.secure ? `${req.protocol}://${req.hostname}/` : `${req.protocol}://${req.hostname}:${process.env.PORT}/`;

    return res.json({
        app: options.name,
        secure: req.secure,
        host,
        startupDate
    })
});

app.use('/usuarios', UsuariosRoutes);
app.use('/empleados', EmpleadosRoutes);
app.use('/productos', ProductosRoutes);
app.use('/roles', RolesRoutes);
app.use('/clientes', ClientesRoutes);
app.use('/puestos', PuestosRoutes);
app.use('/permisos', PermisosRoutes);
app.use('/pedidos', PedidosController);
app.use('/facturas', FacturasRoutes);
app.use('/tipos-autorizaciones', TiposAutorizacionesRoutes);
app.use('/roles-permisos', RolesPermisosRoutes);

//ROUTES
app.use('*', (req, res) => {
    res.status(404).json({ error: "No encontrado" });
});

//Middleware que debe estar hasta el final de todas las rutas para manejar los errores de servidor (500)
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    ErrorHandler(err, res);
});

export default app;
