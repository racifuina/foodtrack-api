import { QueryTypes } from 'sequelize';
import ErrorHandler from '../middlewares/ErrorHandler';
import Modelo from '../models/RolPermiso';
import { dbConnection } from '../dbconn';

export const getAll = (req, res) => {

    const query = `
    SELECT
        "Permisos"."permisoId" AS "permisoId",
        "Permisos".nombre AS "permiso",
        COALESCE ( "RolesPermisos"."tipoAutorizacionId", 0 ) AS "tipoAutorizacionId" 
    FROM
        "Permisos"
        LEFT JOIN "RolesPermisos" ON "RolesPermisos"."permisoId" = "Permisos"."permisoId" 
        AND "RolesPermisos"."rolId" = ${req.query.rolId}
    `;

    return dbConnection.query(query, {
        type: QueryTypes.SELECT
    }).then(items => res.json(items)).catch(err => ErrorHandler(err, res));
};

export const create = (req, res) => {
    const where = {
        rolId: req.body.rolId,
        permisoId: req.body.permisoId,
    }
    return Modelo.findOne({
        where
    }).then(found => {
        const item = found || Modelo.build(where);
        item.tipoAutorizacionId = req.body.tipoAutorizacionId;
        return item.save();
    }).then(item => {
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

