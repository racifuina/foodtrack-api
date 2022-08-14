import Sequelize from 'sequelize';
import moment from 'moment';
import { dbConnection } from '../dbconn';
import Estado from './Estado'
import Cliente from './Cliente'
import DetallePedido from './DetallePedido'
import EstadoPedido from './EstadoPedido'

const Pedido = dbConnection.define('Pedido', {
    pedidoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    facturaId: Sequelize.INTEGER,
    clienteId: Sequelize.INTEGER,
    direccion: Sequelize.STRING,
    nit: Sequelize.STRING,
    email: Sequelize.STRING,
    notas: Sequelize.TEXT,
    numeroTelefono: Sequelize.STRING,
    fechaCreacion: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('fechaCreacion')).format('DD-MM-YYYY HH:mm:ss');
        },
        set() {

        }
    },
    estadoId: Sequelize.INTEGER,
}, {
    timestamps: false,
    tableName: 'Pedidos'
});

Pedido.afterSave((item, options) => {
    if (item.changed('estadoId')) {
        return EstadoPedido.create({
            estadoId: item.estadoId,
            pedidoId: item.pedidoId,
            usuarioId: options.usuarioId,
        });
    }
});

Pedido.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId', as: 'detalles' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId', as: 'pedido' });


export default Pedido;
