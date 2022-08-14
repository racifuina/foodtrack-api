import ErrorHandler from '../middlewares/ErrorHandler';
import Factura from '../models/Factura';
const llavePrimaria = Factura.primaryKeyAttributes[0] || '';

export const getAll = (req, res) => {
    return Factura.findAll({
        include: [{association: 'detalles'}]
    }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const getById = (req, res) => {
    return Factura.findOne({
        where: {
            [llavePrimaria]: req.params.id
        },
        include: [{association: 'detalles'}]
    }).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}
