import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';

const Estado = dbConnection.define('Estado', {
    estadoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
}, {
    timestamps: false,
    tableName: 'Estados'
});

export default Estado;
