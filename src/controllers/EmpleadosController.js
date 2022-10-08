import ErrorHandler from '../middlewares/ErrorHandler';
import Empleado from '../models/Empleado';
const llavePrimaria = Empleado.primaryKeyAttributes[0] || '';

export const getAll = (req, res) => {
    const where = {
        estadoId: req.query.estadoId || 1
    };

    return Empleado.findAll({
        where,
        include: [{
            association: 'usuario',
            attributes: ['email', 'usuarioId']
        }, 'puesto']
    }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const create = (req, res) => {
    return Empleado.create(req.body).then(item => {
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

export const getById = (req, res) => {
    return Empleado.findOne({
        where: {
            [llavePrimaria]: req.params.id
        }
    }).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

export const updateById = (req, res) => {
    return Empleado.findOne({
        where: {
            [llavePrimaria]: req.params.id
        }
    }).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        Object.keys(req.body).forEach(field => {
            if (field != llavePrimaria && field != 'estadoId') {
                item[field] = req.body[field];
            }
        })
        return item.save();
    }).then(item => res.json(item)).catch(err => ErrorHandler(err, res));
}

export const deleteById = (req, res) => {
    return Empleado.findOne({
        where: {
            [llavePrimaria]: req.params.id
        }
    }).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        item.estadoId = 2;
        return item.save();
    }).then(() => res.json({ exito: true })).catch(err => ErrorHandler(err, res));
}