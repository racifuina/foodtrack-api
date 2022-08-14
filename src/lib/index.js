import jwt from 'jwt-simple';
import moment from 'moment';

const crearToken = (usuario) => jwt.encode({
    usuarioId: usuario.usuarioId,
    iat: moment().unix(),
    exp: moment().add(30, 'day').unix(),
}, process.env.JWT_SECRET_TOKEN);

const decodeToken = token => new Promise((resolve, reject) => {
    try {
         const authData = jwt.decode(token, process.env.JWT_SECRET_TOKEN);
         resolve(authData);
    } catch (err) {
        reject(err)
    }
})

module.exports = {
    crearToken,
    decodeToken
}