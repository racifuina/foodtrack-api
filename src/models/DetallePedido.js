import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';
import Producto from './Producto'

const DetallePedido = dbConnection.define('detallePedido', {
    detallePedidoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pedidoId: Sequelize.INTEGER,
    productoId: Sequelize.INTEGER,
    precioUnitario: Sequelize.DECIMAL(25, 2),
    subtotal: Sequelize.DECIMAL(25, 2),
    cantidad: Sequelize.INTEGER,
}, {
    timestamps: false,
    tableName: 'DetallePedidos'
});

DetallePedido.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });
export default DetallePedido;
