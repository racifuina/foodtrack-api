import ErrorHandler from '../middlewares/ErrorHandler';
import Modelo from '../models/Cliente';
const llavePrimaria = Modelo.primaryKeyAttributes[0] || '';

export const getAll = (req, res) => {
    const where = {
        estadoId: req.query.estadoId || 1
    };

    return Modelo.findAll({ where }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const create = (req, res) => {
    return Modelo.create(req.body).then(item => {
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

export const getById = (req, res) => {
    return Modelo.findOne({
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
    return Modelo.findOne({
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
    return Modelo.findOne({
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

export const validarNit = (req, res) => {
    return axios.post(`${process.env.URL_INFO_NIT}`, {
        IDTipoRequest: 0,
        NIT: req.params.nitCliente,
        RequestorName: "Sistema AURORA",
        CentroCostoID: "",
        CodigoEstablecimiento: 0,
        EmpresaID: 0
    }, {
        headers: {
            'Authorization': `${process.env.TOKEN_INFO_NIT}`
        }
    }).then(response => response.data).then(info => res.json(info)).catch(err => ErrorHandler(err, res))
};