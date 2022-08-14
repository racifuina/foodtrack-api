import Sequelize from 'sequelize';
import Estado from './Estado'
import { dbConnection } from '../dbconn';
import Puesto from './Puesto';

const Empleado = dbConnection.define('Empleado', {
    empleadoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    puestoId: Sequelize.INTEGER,
    estadoId: Sequelize.INTEGER
}, {
    timestamps: false,
    tableName: 'Empleados'
});

Empleado.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
Empleado.belongsTo(Puesto, { foreignKey: 'puestoId', as: 'puesto' });

export default Empleado;
