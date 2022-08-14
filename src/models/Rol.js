import Sequelize from 'sequelize';
import Estado from './Estado';
import RolPermiso from './RolPermiso';
import { dbConnection } from '../dbconn';

const Rol = dbConnection.define('Rol', {
    rolId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    estadoId: Sequelize.INTEGER
}, {
    timestamps: false,
    tableName: 'Roles'
});

Rol.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
Rol.hasMany(RolPermiso, { foreignKey: 'rolId', as: 'permisos' });

export default Rol;
