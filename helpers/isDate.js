const moment = require("moment");

const isDate = (value, { req, location, path }) => {
  if(!value) {  // Si el value es nulo
    return false; // Le indicamos a express que existe un error
  }
  const fecha = moment(value);
  if(!fecha.isValid()) {
    return false;
  }
  return true;
}
module.exports = {
  isDate
}