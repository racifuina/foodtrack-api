import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';

const TipoAutorizacion = dbConnection.define('TipoAutorizacion', {
    tipoAutorizacionId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
}, {
    timestamps: false,
    tableName: 'TiposAutorizaciones'
});

export default TipoAutorizacion;
