import ErrorHandler from '../middlewares/ErrorHandler';
import Puesto from '../models/Puesto';
const llavePrimaria = Puesto.primaryKeyAttributes[0] || '';

export const getAll = (req, res) => {
    const where = {
        estadoId: req.query.estadoId || 1
    };

    return Puesto.findAll({ where }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const create = (req, res) => {
    return Puesto.create(req.body).then(item => {
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

export const getById = (req, res) => {
    return Puesto.findOne({
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
    return Puesto.findOne({
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
    return Puesto.findOne({
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