import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';
import Estado from './Estado'

const Producto = dbConnection.define('Producto', {
    productoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    descripcion: Sequelize.STRING,
    imagen: Sequelize.TEXT,
    precio: {
        type: Sequelize.DECIMAL(25, 2),
    },
    estadoId: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'Productos',
});

Producto.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });

export default Producto;
