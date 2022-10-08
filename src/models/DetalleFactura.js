import Sequelize from 'sequelize';
import { dbConnection } from '../dbconn';

const DetalleFactura = dbConnection.define('detalleFactura', {
    detalleFacturaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    facturaId: Sequelize.INTEGER,
    cantidad: Sequelize.INTEGER,
    descripcion: Sequelize.STRING,
    precioUnitario: Sequelize.DECIMAL(25, 2),
    descuento: Sequelize.DECIMAL(25, 2),
    subtotal: Sequelize.DECIMAL(25, 2),
}, {
    timestamps: false,
    tableName: 'DetallesFacturas'
});

export default DetalleFactura;
