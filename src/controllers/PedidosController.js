import axios from 'axios';
import ErrorHandler from '../middlewares/ErrorHandler';
import DetallePedido from '../models/DetallePedido';
import EstadoPedido from '../models/EstadoPedido';
import Pedido from '../models/Pedido';
import Factura from '../models/Factura';
import { v4 as uuidv4 } from 'uuid';
import { uid } from 'uid';
import { facturaPedido } from '../helpers/emailTemplates';
import {sendEmail, emailTemplates, sendHtmlEmail } from '../lib/emailService';
import { Op } from 'sequelize';

const llavePrimaria = Pedido.primaryKeyAttributes[0] || '';

export const getAll = (req, res) => {
    return Pedido.findAll({
        include: [{
            association: 'estado',
            attributes: ['nombre']
        }, {
            association: 'cliente',
            attributes: ['nombre']
        }],

        order: [[llavePrimaria, 'DESC']]
    }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const getAllForCocina = (req, res) => {
    return Pedido.findAll({
        where: {
            estadoId: {
                [Op.in]: [3, 4]
            }
        },
        include: [{
            required: false,
            association: 'detalles',
            include: [{
                association: 'producto',
                attributes: ['nombre']
            }]
        }, {
            association: 'estado',
            attributes: ['nombre']
        }, {
            association: 'cliente',
            attributes: ['nombre']
        }],
        order: [['fechaCreacion', 'ASC']]
    }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const getAllForMensajeria = (req, res) => {
    return Pedido.findAll({
        where: {
            estadoId: {
                [Op.in]: [5, 6]
            }
        },
        include: [{
            required: false,
            association: 'detalles',
            include: [{
                association: 'producto',
                attributes: ['nombre']
            }]
        }, {
            association: 'estado',
            attributes: ['nombre']
        }, {
            association: 'cliente',
            attributes: ['nombre']
        }],
        order: [['fechaCreacion', 'ASC']]
    }).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const create = (req, res) => {
    return Pedido.create(req.body, {
        include: [{
            association: 'detalles',
        }],
        usuarioId: req.usuario.usuarioId
    }
    ).then(item => item.reload({
        include: [{
            required: false,
            association: 'detalles',
            include: [{
                association: 'producto',
                attributes: ['nombre']
            }]
        }, {
            association: 'cliente',
            attributes: ['nombre']
        }]
    })).then(item => {
        if (item.email) {
           return sendEmail(item.email, emailTemplates.nuevoPedido, {
                nombreUsuario: item.cliente.nombre,
                link: `${process.env.WEB_UI_URL}/status-pedido/${item.pedidoId}`,
                pedidoId: item.pedidoId,
                direccionPedido: item.direccion,
                totalPedido: item.detalles.reduce((total, item) => parseFloat(item.subtotal) + total, 0).toFixed(2),
            }).then(() => item);
        }
        return item;
    }).then(item => {
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

export const getById = (req, res) => {
    return Pedido.findOne({
        where: {
            [llavePrimaria]: req.params.id
        },
        include: [{
            required: false,
            association: 'detalles',
            include: [{
                association: 'producto',
                attributes: ['nombre']
            }]
        }]
    }).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        return res.json(item);
    }).catch(err => ErrorHandler(err, res));
}

export const updateById = (req, res) => {
    return DetallePedido.destroy({
        where: {
            [llavePrimaria]: req.params.id
        }
    }).then(() => Promise.all(req.body.detalles.map(detalle => {
        detalle[llavePrimaria] = req.params.id
        return DetallePedido.create(detalle);
    }))).then(() => Pedido.findOne({
        where: {
            [llavePrimaria]: req.params.id
        }
    })).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        Object.keys(req.body).forEach(field => {
            if (field != llavePrimaria && field != 'estadoId' && field != 'detalles') {
                item[field] = req.body[field];
            }
        })
        return item.save();
    }).then(item => item.reload({
        include: [{
            required: false,
            association: 'detalles',
            include: [{
                association: 'producto',
                attributes: ['nombre']
            }]
        }]
    })).then(item => {
        return res.json(item)
    }).catch(err => ErrorHandler(err, res));
}

export const deleteById = (req, res) => {
    return Pedido.findOne({
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


export const changeStatusById = (req, res) => {
    return Pedido.findOne({
        where: {
            [llavePrimaria]: req.params.id
        },
    }).then(item => {
        if (!item) {
            res.status(404);
            throw Error('No encontrado');
        }
        if (item.estadoId > parseInt(req.body.estadoId)) {
            throw Error('No se puede a un estado anterior');
        }
        item.estadoId = req.body.estadoId;
        return item.save({ usuarioId: req.usuario.usuarioId });
    }).then(pedido => {
        if (pedido.estadoId === 7) {
            return pedido.reload({
                include: ['cliente',{
                    required: false,
                    association: 'detalles',
                    include: [{
                        association: 'producto',
                        attributes: ['nombre']
                    }]
                }]
            })
        }
        return pedido;
    }).then(pedido => {
        if (pedido.estadoId === 7) {
            return axios.post(`${process.env.URL_INFO_NIT}`, {
                IDTipoRequest: 0,
                NIT: pedido.nit,
                RequestorName: "Sistema AURORA",
                CentroCostoID: "",
                CodigoEstablecimiento: 0,
                EmpresaID: 0
            }, {
                headers: {
                    'Authorization': `${process.env.TOKEN_INFO_NIT}`
                }
            }).then(response => response.data).then(info => {
                if (info.Receptor.NombreReceptor.length > 0) {
                    return {
                        nombreReceptor: info.Receptor.NombreReceptor,
                        nit: info.Receptor.NITReceptor
                    }
                }
                return {
                    nombreReceptor: 'CONSUMIDOR FINAL',
                    nit: 'CF'
                }
            }).then(({ nombreReceptor, nit }) => {
                return Factura.create({
                    pedidoId: pedido.pedidoId,
                    nombreReceptor,
                    nit,
                    serie: uid(8).toUpperCase(),
                    uid: uuidv4(),
                    detalles: pedido.detalles.map(detalle => ({
                        cantidad: detalle.cantidad,
                        descripcion: detalle.producto.nombre,
                        precioUnitario: detalle.precioUnitario,
                        descuento: 0,
                        subtotal: detalle.subtotal
                    }))
                }, {
                    include: ['detalles']
                })
            }).then(factura => {
                pedido.facturaId = factura.facturaId;
                return pedido.save();
            }).then(item => {
                if (item.email) {
                    return sendEmail(item.email, emailTemplates.facturaPedido, {
                        link: `${process.env.WEB_UI_URL}/impresion-factura/${item.facturaId}`,
                        pedidoId: item.pedidoId
                    }).then(() => item);
                }
                return item;
            })
        }
        return pedido;
    }).then((item) => res.json(item)).catch(err => ErrorHandler(err, res));
}

export const getChangelogById = (req, res) => {
    return EstadoPedido.findAll({
        where: { [llavePrimaria]: req.params.id },
        include: [{
            association: "estado", attributes: ['nombre', 'estadoId']
        }, {
            association: "usuario", attributes: ['email'],
            include: [{
                association: "empleado", attributes: ['nombre']
            }]
        }],
        order: [["fecha", "ASC"]],
    }).then((item) => {
        return res.json(item)
    }).catch(err => ErrorHandler(err, res));
}
