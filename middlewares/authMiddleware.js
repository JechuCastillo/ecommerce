const jwt = require("../service/jwtService");
function authMiddleware(req, res, next) {
  // Obtiene el token del encabezado Authorization
  // const authHeader = req.headers.authorization; //Brearer
  // if (!authHeader) {
  //   //Si esta vacio quiere decir que no hay token
  //   res.error("Token requerido", 401, { error: "Token requerido" });
  // }
  // const token = authHeader.split(" ")[1]; //Accede al Brearer
  
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
