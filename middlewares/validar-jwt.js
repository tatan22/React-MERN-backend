const { response: res, request: req, next } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
	// x-token headers
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No hay token en la petición",
		});
	}
	try {
		const { uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // La req pasa por referencia a cualquier función que siga en la petición
    req.uid = uid;
    req.name = name;
		
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "Token no valido",
		});
	}
	next();
};

module.exports = {
	validarJWT,
};
