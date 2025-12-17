/**
 * La linea de abajo remplaza la de import express from "express"; ya que esta no es compatible con node
 */
const path = require("path"); //importamos nuestro path 
const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");

//? 1. Crear el servidor de express
const app = express(); // Se le da el nombre de app por convenio

//? 2. Directorio Publico
// El use en express se usa para configurar middlewares
app.use(express.static("public"));

// conexión a la base de datos
dbConnection();

// Cors
app.use(cors());

//? 3. Lectura y parseo del body
app.use(express.json());

//? 4. Rutas
//auth // crear, login, renew
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//? Solucionar error de cargar de URL no encontrada
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//? 5. Escuchar Peticiones
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log("Servidor corriendo en el puerto :", port);
});
