const { response: res, request: req } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
	const { email, password } = req.body;
	try {
		let usuario = await Usuario.findOne({ email });
		if (usuario) {
			return res.status(400).json({
				ok: false,
				msg: "El correo ya esta registrado",
			});
		}
		usuario = new Usuario(req.body);
		// Encriptar contraseña
		const salt = bcrypt.genSaltSync(); //  El salt es un numero aleatorio por defecto de 10
		usuario.password = bcrypt.hashSync(password, salt);
		await usuario.save();
		// Generar el JWT
		const token = await generarJWT(usuario.id, usuario.name);
		res.status(201).json({
			ok: true,
			uid: usuario._id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

const loginUsuario = async (req, res) => {
	const { email, password } = req.body;
	try {
		const usuario = await Usuario.findOne({ email });
		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: "Credenciales incorrectas - email",
			});
		}
		// Confirmar si el password es correcto
		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Credenciales incorrectas - password",
			});
		}
		// Generar el JWT
		const token = await generarJWT(usuario.id, usuario.name);
		res.status(200).json({
			ok: true,
			uid: usuario._id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

const revalidarToken = async (req, res) => {
	const { uid, name } = req;

	//generar un nuevo JWT y retornarlo en la petición
	const token = await generarJWT(uid, name);

	res.json({
		ok: true,
		uid,
		name,
		token,
		msg: "Token renovado",
	});
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};
