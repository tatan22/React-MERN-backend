/*?
 * EVENTS ROUTER
 * Crearemos Todo el CRUD de Eventos
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
	crearEvento,
	actualizarEvento,
	eliminarEvento,
	getEventos,
} = require("../controllers/events");
const router = Router();

//? Todas tienen que pasar por la validación del JWT
router.use(validarJWT); // Cualquier petición que venga aca va a pasar por la validación del JWT

// Obtener Eventos
router.get("/", getEventos);

// Crear nuevo Evento
router.post(
	"/",
	[
		check("title", "El titulo es obligatorio").not().isEmpty(),
		check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalización es obligatoria").custom(isDate),
		validarCampos,
	],
	crearEvento
);

// Actualizar Evento
router.put("/:id", actualizarEvento);

// Borrar Evento
router.delete("/:id", eliminarEvento);

module.exports = router;
