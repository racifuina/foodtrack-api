import Usuario from '../models/Usuario';
import services from '../lib'

export default (req, res, next) => {
    if (!req.headers.authorization && !req.query.AuthToken) {
        return res.status(403).json({ error: "Debes iniciar sesión para accesar a este recurso" });
    }

    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.query.AuthToken;

    return services.decodeToken(token).then(response => {

        const usuario = Usuario.findOne({
            where: {
                usuarioId: response.usuarioId
            },
            attributes: ['usuarioId', 'email', 'estadoId'],
            include: [{
                association: 'empleado'
            }, {
                association: 'rol',
                include: [{
                    association: 'permisos',
                    required: false,
                    include: ['permiso']
                }]
            }]
        });

        return Promise.all([usuario]);

    }).then(([usuario]) => {

        if (!usuario) {
            throw Error("No se encontró el Usuario");
        }

        if (usuario.estadoId != 1) {
            throw Error("Acceso denegado: Usuario No Activo");
        }
        const user = usuario.toJSON();
        const permisos = usuario.rol.permisos.map(permiso => ({
            permiso: permiso.permiso.nombre,
            tipoAutorizacionId: permiso.tipoAutorizacionId,
        }));

        user.permisos = permisos

        req.usuario = user;
        next();
    }).catch(err => {
        console.log(`err.message`, err.message)
        return res.status(401).json({ MensajeError: `El token de autorización no es válido. ${err.message}` });
    });

}
