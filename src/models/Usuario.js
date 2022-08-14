import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import Estado from './Estado'
import Empleado from './Empleado'
import { dbConnection } from '../dbconn';
import Rol from './Rol';
const SALT_WORK_FACTOR = 10;

const Usuario = dbConnection.define('Usuario', {
    usuarioId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    empleadoId: Sequelize.INTEGER,
    estadoId: Sequelize.INTEGER,
    rolId: Sequelize.INTEGER,
    token: Sequelize.STRING,
}, {
    timestamps: false,
    tableName: 'Usuarios'
});

Usuario.belongsTo(Empleado, { foreignKey: 'empleadoId', as: 'empleado' });
Empleado.hasOne(Usuario, { foreignKey: 'empleadoId', as: 'usuario' })
Usuario.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
Usuario.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' });

Usuario.beforeSave(user => {
    if (!user.changed('password')) {
        return 0;
    }
    return bcrypt.genSalt(SALT_WORK_FACTOR).then(salt => bcrypt.hash(user.password, salt)).then(hash => user.password = hash);
});

Usuario.prototype.validarPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

export default Usuario;
