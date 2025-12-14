/**
 * @param {import('express').Request} req
 */

const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped(),
		});
	}

  next();
};

module.exports = {
  validarCampos,
};
