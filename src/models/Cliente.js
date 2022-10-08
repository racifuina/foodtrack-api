import Sequelize from 'sequelize';
import Estado from './Estado'
import { dbConnection } from '../dbconn';

const Cliente = dbConnection.define('Cliente', {
    clienteId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    email: Sequelize.STRING,
    nit: Sequelize.STRING,
    direccion: Sequelize.STRING,
    numeroTelefono: {
        type: Sequelize.STRING,
        unique: {
            name: 'Clientes_numeroTelefono_key',
            msg: 'El Número de teléfono ya está en uso.'
        },
    },
    estadoId: Sequelize.INTEGER
}, {
    timestamps: false,
    tableName: 'Clientes',
});

Cliente.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' })

export default Cliente;
