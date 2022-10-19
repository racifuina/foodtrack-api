import { faker } from '@faker-js/faker';
import Cliente from '../../src/models/Cliente';
import Empleado from '../../src/models/Empleado';
import Permiso from '../../src/models/Permiso';
import Producto from '../../src/models/Producto';
import Puesto from '../../src/models/Puesto';
import Rol from '../../src/models/Rol';
import RolPermiso from '../../src/models/RolPermiso';
import Usuario from '../../src/models/Usuario';

export const MakeUser = async (params = {}) => {
    faker.seed();
    return await new Usuario({
        email: params.email ?? faker.internet.email(),
        password: params.password ?? 'password',
        empleadoId: params.empleadoId ?? (await MakeEmpleado()).empleadoId,
        estadoId: params.estadoId ?? 1,
        rolId: params.estadoId ?? (await MakeRol()).rolId,
        token: params.token ?? faker.datatype.uuid(),
    }).save();
};

export const MakeEmpleado = async (params = {}) => {
    faker.seed();
    return await new Empleado({
        nombre: params.nombre ?? faker.name.fullName(),
        puestoId: params.estadoId ?? (await MakePuesto()).puestoId,
        estadoId: params.estadoId ?? 1,
    }).save();
};

export const MakePuesto = async (params = {}) => {
    faker.seed();
    return await new Puesto({
        nombre: params.nombre ?? faker.name.jobDescriptor(),
        estadoId: params.estadoId ?? 1,
    }).save();
};

export const MakeRol = async (params = {}) => {
    faker.seed();
    return await new Rol({
        nombre: params.nombre ?? faker.name.jobArea(),
        estadoId: params.estadoId ?? 1,
    }).save();
};

export const MakeRolPermiso = async (params = {}) => {
    faker.seed();
    return await new RolPermiso({
        rolId: params.rolId ?? (await MakeRol()).rolId,
        permisoId: params.permisoId ?? (await MakePermiso()).permisoId,
        tipoAutorizacionId: params.tipoAutorizacionId ?? 1,
    }).save();
};

export const MakePermiso = async (params = {}) => {
    faker.seed();
    return await new Permiso({
        nombre: params.nombre ?? faker.random.word(),
        descripcion: params.descripcion ?? faker.lorem.sentence(),
    }).save();
};

export const MakeProducto = async (params = {}) => {
    faker.seed();
    return await new Producto({
        nombre: params.nombre ?? faker.commerce.product(),
        descripcion: params.descripcion ?? faker.random.words(),
        imagen: params.imagen ?? faker.internet.url(),
        precio: params.precio ?? faker.commerce.price(),
        estadoId: params.estadoId ?? 1,
    }).save();
};

export const MakeCliente = async (params = {}) => {
    faker.seed();
    return await new Cliente({
        nombre: params.nombre ?? faker.name.fullName(),
        email: params.email ?? faker.internet.email(),
        nit: params.nit ?? faker.datatype.number().toString(),
        direccion: params.direccion ?? faker.address.streetAddress(),
        numeroTelefono: params.numeroTelefono ?? faker.phone.number(),
        estadoId: params.estadoId ?? 1,
    }).save();
};
