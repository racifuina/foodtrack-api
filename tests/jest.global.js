import '../src/models';
import { dbConnection } from '../src/dbconn';
import Estado from '../src/models/Estado';
import TipoAutorizacion from '../src/models/TipoAutorizacion';
import Permiso from '../src/models/Permiso';

module.exports = async () => {
    console.log(`
    applying migrations`);
    await dbConnection.sync({ force: true });
    const estados = ['Activo', 'Inactivo', 'En Preparacion', 'Recibido', 'Entregado', 'Cancelado', 'En Camino', 'Listo Para Enviar'];
    const tiposAutorizaciones = ['Denegado', 'Escritura', 'Lectura'];
    const permisos = ['Gestion_Pedidos', 'Gestion_Clientes', 'Gestion_Productos', 'Gestion_Roles', 'Gestion_Empleados', 'Gestion_Usuarios', 'Gestion_Cocina', 'Gestion_Mensajeria', 'Gestion_Facturas'];
    console.log('Seeding estados');
    for (const indice in estados) {
        await new Estado({ nombre: estados[indice] }).save();
    }
    console.log('Seeding tiposAutorizaciones');
    for (const indice in tiposAutorizaciones) {
        await new TipoAutorizacion({ nombre: tiposAutorizaciones[indice], tipoAutorizacionId: indice }).save();
    }
    console.log('Seeding permisos');
    for (const indice in permisos) {
        await new Permiso({ nombre: permisos[indice] }).save();
    }
};
