const jwt = require("jsonwebtoken");
const config = require("../config/config");
function generarToken(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    //Crea el token con el payload que mandamos en login, la clave secrete y la duracion
    expiresIn: config.jwtExpiresIn,
  });
}

function verificarToken(token) {
  return jwt.verify(token, config.jwtSecret); //Devuelve el payload en caso de ser un token valido.
}

module.exports = { generarToken, verificarToken };
