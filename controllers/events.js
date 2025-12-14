/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const Evento = require("../models/Evento");

const getEventos = async (req, res) => {
	const eventos = await Evento.find().populate("user", "name"); // Del usuario solo nos interesa el name
	res.json({ ok: true, eventos });
};

const crearEvento = async (req, res) => {
	const evento = new Evento(req.body);
	try {
		evento.user = req.uid;
		const eventoDB = await evento.save();
		res.status(201).json({
			ok: true,
			evento: eventoDB,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
	res.json({ ok: true, msg: "crearEvento" });
};

const actualizarEvento = async (req, res) => {
	const eventoId = req.params.id;
	try {
		const evento = await Evento.findById(eventoId);
		// Verificar el id
		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: "Evento no encontrado por id",
			});
		}
		// Verificar que el usuario sea quien lo creo
		if (evento.user.toString() !== req.uid) {
			return res.status(401).json({
				ok: false,
				msg: "No tiene permiso para editar este evento",
			});
		}
		const nuevoEvento = {
			...req.body,
			user: req.uid,
		};
		const eventoActualizado = await Evento.findByIdAndUpdate(
			//Busca un elemento por el id y lo actualiza
			eventoId,
			nuevoEvento,
			{ new: true } // Devuelve el elemento actualizado y no el antiguo
		);
		res.json({
			ok: true,
			evento: eventoActualizado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

const eliminarEvento = async (req, res) => {
	const eventoId = req.params.id;
  const uid = req.uid;
	try {
		const evento = await Evento.findById(eventoId);
		// Verificar el id
		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: "Evento no encontrado por id",
			});
		}

		// Verificar que el usuario sea quien lo creo
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "No tiene permiso para eliminar este evento",
			});
		}
    await Evento.findByIdAndDelete(
      eventoId
    );
    res.json({
      ok: true,
      msg: "Evento eliminado"
    });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador",
		});
	}
};

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
};
