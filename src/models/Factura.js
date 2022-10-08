import Sequelize from 'sequelize';
import moment from 'moment';
import { dbConnection } from '../dbconn';
import DetalleFactura from './DetalleFactura'

const Factura = dbConnection.define('Factura', {
    facturaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pedidoId: Sequelize.INTEGER,
    nombreReceptor: Sequelize.STRING,
    nit: Sequelize.STRING,
    serie: Sequelize.STRING,
    uid: Sequelize.STRING,
    fechaEmision: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('fechaEmision')).format('DD-MM-YYYY HH:mm:ss');
        },
        set() {

        }
    }
}, {
    timestamps: false,
    tableName: 'Facturas'
});

Factura.hasMany(DetalleFactura, { foreignKey: 'facturaId', as: 'detalles' });
DetalleFactura.belongsTo(Factura, { foreignKey: 'facturaId', as: 'pedido' });


export default Factura;
