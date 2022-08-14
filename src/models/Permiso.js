import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';

const Permiso = dbConnection.define('Permiso', {
    permisoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
}, {
    timestamps: false,
    tableName: 'Permisos'
});

export default Permiso;
