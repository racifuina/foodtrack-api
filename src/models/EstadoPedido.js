import Sequelize from 'sequelize';
import moment from 'moment';
import { dbConnection } from '../dbconn';
import Estado from './Estado'
import Usuario from './Usuario'

const EstadoPedido = dbConnection.define('EstadoPedido', {
    estadoPedidoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pedidoId: Sequelize.INTEGER,
    estadoId: Sequelize.INTEGER,
    usuarioId: Sequelize.INTEGER,
    fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('fecha')).format('DD-MM-YYYY HH:mm:ss');
        },
        set() {

        }
    }
}, {
    timestamps: false,
    tableName: 'EstadosPedidos'
});

EstadoPedido.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
EstadoPedido.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

export default EstadoPedido;
