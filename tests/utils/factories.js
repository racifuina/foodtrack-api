import { faker } from '@faker-js/faker';
import Empleado from '../../src/models/Empleado';
import Permiso from '../../src/models/Permiso';
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
