import Sequelize from 'sequelize';
import Estado from './Estado'
import { dbConnection } from '../dbconn';

const Puesto = dbConnection.define('Puesto', {
    puestoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    estadoId: Sequelize.INTEGER
}, {
    timestamps: false,
    tableName: 'Puestos'
});

Puesto.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' })

export default Puesto;
