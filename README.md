# Backend Calendar

## DEV

- Instalar dependencias `npm install`
- Clonar el archivo `.env.template` y renombrarlo a `.env`
- Cambiar las variables de entorno acorde a tu configuración
- Correr el servidor `npm start`

## PRODUCTION

1) En la raíz del proyecto ejecutamos `npm init -y`( Crea el package.json con la configuración por defecto)
2) Instalación de un paquete para utilidad cuando desarrollamos en node que es el nodemon, simplemente nodemon detecta los cambios y recarga el servidor. Para su instalación ejecutamos `npm install -g nodemon` o `npm i -g nodemon` para que se instale globalmente

    > Recomendación para la instalación de paquetes globales, se debe hacer con permisos de administrador del sistema

3) Configuración de Express

    - Instalación de Express `npm install express`

4) Creación de una carpeta publica

    La llamamos public por estándar para indicar que todo lo que se encuentre allí será visible para el usuario.

5) Creamos nuestras variables de entorno

    - Creamos el archivo .env en la raíz del proyecto
    - Agregamos las variables de entorno
    - Para poder hacer uso de la variables de entorno en nuestro proyecto debemos instalar dotenv `npm install dotenv`

6) Creación de rutas relacionadas con los usuarios
7) EndPoints de Remover, crear y login

## Backend Calendar Funcionalidad

### Validaciones de los EndPoints

Para esto usaremos un paquete de terceros como express-validator. Para su instalación usaremos `npm install express-validator`

### Creación de custom Middlewares

### Configuración de base de datos

Vamos a usar el DRM la base de datos de mongoDB. Para su instalación usaremos `npm install mongoose`

## Encriptación de contraseñas

Usaremos e método de hash de una via, con la librería de bcryptjs. Para su instalación usaremos `npm install bcryptjs`

### validar si coinciden las contraseñas

bcryptjs tiene un método que nos permite verificar si dos contraseñas son iguales.

## Generando el JWT

Vamos a validar la autenticación mediante el JWT. Me permiten manejar la sección de forma pasiva, la librería es jsonwebtoken. Para su instalación usaremos `npm install jsonwebtoken`  

## Configuración de los CORS

El cors nos permite permitir la comunicación entre distintos dominios. Para su instalación usaremos `npm install cors`

## Crear validaciones personalizadas con el express-validator

En este caso express-validator no tiene un check para validar fechas por lo que crearemos un middleware personalizado. Usaremos dentro de este middleware la librería de moment para poder trabajar con fechas.
Para la instalación de moment usaremos `npm install moment`
