/**
 * Rutas de Usuarios /Auth
 * host + /api/auth
 */

// const express = require("express");
// const router = express.Router();

// Modo simplificado de importación de express
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
	crearUsuario,
	revalidarToken,
	loginUsuario,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password debe ser de 6 caracteres").isLength({
			min: 6,
		}),
    validarCampos
	],
	loginUsuario
);

router.post(
	"/new",
	[
		// Middlewares
		check("name", "El name es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password debe ser de 6 caracteres").isLength({
			min: 6,
		}),
    validarCampos
	],
	crearUsuario
);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
