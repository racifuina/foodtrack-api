import uniqid from 'uniqid';
import fs from 'fs';
import path from 'path';
import Usuario from '../models/Usuario';
import { crearToken } from '../lib';
import ErrorHandler from '../middlewares/ErrorHandler';
import emailService from '../lib/emailService';
const WEB_UI_URL = process.env.WEB_UI_URL || "https://foodtrack-umg.web.app";

const llavePrimaria = Usuario.primaryKeyAttributes[0] || '';

export const getAll = (req, res) => {

	const where = {
		estadoId: req.query.estadoId || 1
	};

	return Usuario.findAll({
		where,
		include: ['rol', 'empleado']
	}).then(items => res.json(items)).catch(err => ErrorHandler(err, res))
};

export const create = (req, res) => {
	const token = uniqid();
	req.body.token = token;
	return Usuario.create(req.body).then(usuario => usuario.reload({ include: ['empleado'] }))
		.then(usuario => {
			let html = fs.readFileSync(path.join(__dirname, '..', 'resources/new-user.html'), 'utf8');
			html = html.replace("{host}", WEB_UI_URL);
			html = html.replace("{host}", WEB_UI_URL);
			html = html.replace("{name}", usuario.empleado.nombre);
			html = html.replace("{token}", usuario.token);
			html = html.replace("{token}", usuario.token);
			html = html.replace("{email}", usuario.email);
			html = html.replace("{email}", usuario.email);
			html = html.replace("{email}", usuario.email);
			html = html.replace("{imagen}", "logo-foodtrack");

			const mailOptions = {
				from: `"Soporte FoodTrack" <${process.env.EMAIL_USER}>`,
				to: [usuario.email],
				subject: `Bienvenido al sistema FoodTrack ${usuario.empleado.nombre}`,
				html: html,
				attachments: [{
					filename: 'foodtrack.png',
					path: path.join(__dirname, '..', 'resources/foodtrack-blue-bg.png'),
					cid: 'logo-foodtrack'
				}]
			};
			return emailService.sendMail(mailOptions).then(() => usuario);
		}).then(item => {
			return res.json(item);
		}).catch(err => ErrorHandler(err, res));
}

export const getById = (req, res) => {
	return Usuario.findOne({
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
	return Usuario.findOne({
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
	return Usuario.findOne({
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

export const autenticar = (req, res) => {
	const { email } = req.body;
	return Usuario.findOne({
		where: {
			email
		},
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
	}).then(usuario => {
		if (!usuario) {
			res.status(404);
			throw Error("No encontrado");
		}


		return usuario.validarPassword(req.body.password).then(esValida => {
			if (!esValida) {
				res.status(400);
				throw Error("Contraseña Incorrecta");
			}

			if (usuario.estadoId == 1) {
				const user = {
					usuarioId: usuario.usuarioId
				}

				const permisos = usuario.rol.permisos.map(permiso => ({
					permiso: permiso.permiso.nombre,
					tipoAutorizacionId: permiso.tipoAutorizacionId,
				}));

				res.json({
					mensaje: "Usuario autenticado",
					usuario: {
						usuarioId: usuario.usuarioId,
						nombre: usuario.empleado.nombre,
						permisos
					},
					token: crearToken(user)
				});
			} else {
				res.status(403);
				throw Error("Acceso denegado: Usuario No Activo");
			}
		})
	}).catch(err => ErrorHandler(err, res));
}

export const infoUsuario = (req, res) => {
	return res.json(req.usuario)
}

export const solicitarRecuperarPassword = (req, res) => {
	const token = uniqid();
	const email = req.body.email;

	return Usuario.findOne({
		where: { email },
		include: ['empleado']
	}).then(usuario => {
		if (!usuario) {
			res.status(404);
			throw Error("No encontrado");
		}
		if (usuario.estadoId != 1) {
			throw Error("No se puede restablecer la contraseña. Usuario no Activo.")
		}
		usuario.token = token;
		return usuario.save();
	}).then(usuario => {
		let html = fs.readFileSync(path.join(__dirname, '..', 'resources/reset-password.html'), 'utf8');
		html = html.replace("{host}", WEB_UI_URL);
		html = html.replace("{host}", WEB_UI_URL);
		html = html.replace("{name}", usuario.empleado.nombre);
		html = html.replace("{token}", usuario.token);
		html = html.replace("{token}", usuario.token);
		html = html.replace("{email}", usuario.email);
		html = html.replace("{email}", usuario.email);
		html = html.replace("{email}", usuario.email);
		html = html.replace("{imagen}", "logo-foodtrack");

		const mailOptions = {
			from: `"Soporte FoodTrack" <${process.env.EMAIL_USER}>`,
			to: [usuario.email],
			subject: `Recuperación de contraseña sistema FoodTrack ${usuario.empleado.nombre}`,
			html: html,
			attachments: [{
				filename: 'foodtrack.png',
				path: path.join(__dirname, '..', 'resources/foodtrack-blue-bg.png'),
				cid: 'logo-foodtrack'
			}]
		};
		return emailService.sendMail(mailOptions);
	}).then(() => {
		return res.json({ mensaje: "Te hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña" });
	}).catch(err => ErrorHandler(err, res));
}

export const cambiarPassword = (req, res) => {

	const password = req.body.password;
	const token = req.body.token;

	if (!password || !token) {
		return res.status(500).json({ mensajeError: "Todos los campos son obligatorios" });
	}

	return Usuario.findOne({
		where: { token }
	}).then(usuario => {
		if (!usuario) {
			res.status(404);
			throw Error("Al parecer, el enlace no es valido, realiza una nueva solicitud de recuperación.")
		}
		usuario.password = password;
		usuario.token = null;
		return usuario.save();
	}).then(() => {
		res.json({ mensaje: "La contraseña se ha actualizado exitosamente" });
	}).catch(err => ErrorHandler(err, res));
}