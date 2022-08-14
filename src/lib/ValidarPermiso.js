const validarPermiso = (usuario, permiso, tipoAutorizacion) => {
    if (usuario.permisos) {
        const autorizacion = usuario.permisos.find(p => permiso === p.permiso) || { tipoAutorizacionId: 0 }
        return autorizacion.tipoAutorizacionId >= tipoAutorizacion
    }
    return false;
}

export default validarPermiso


