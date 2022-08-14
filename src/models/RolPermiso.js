import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';
import Permiso from './Permiso';
import TipoAutorizacion from './TipoAutorizacion';

const RolPermiso = dbConnection.define('rolPermiso', {
    rolPermisoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolId: Sequelize.INTEGER,
    permisoId: Sequelize.INTEGER,
    tipoAutorizacionId: Sequelize.INTEGER,
}, {
    timestamps: false,
    tableName: 'RolesPermisos'
});

RolPermiso.belongsTo(Permiso, { foreignKey: 'permisoId', as: 'permiso' });
RolPermiso.belongsTo(TipoAutorizacion, { foreignKey: 'tipoAutorizacionId', as: 'tipoAutorizacion' });

export default RolPermiso;
