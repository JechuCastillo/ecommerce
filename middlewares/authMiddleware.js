const jwt = require("../service/jwtService");
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.error("Token requerido", 401, "El usuario no posee token");
  }
  try {
    const user = jwt.verificarToken(token); //Usa el servicio para verificar que el token sea valido, devolviendo el payload
    req.user = user;
    next();
  } catch (error) {
    return res.error("Error en el token", 403,'Token invalido');
  }
}

module.exports = authMiddleware;
