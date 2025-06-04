function verificarAdmin(req, res, next) {
  if (!req.user || req.user.rol !== "admin") { //Verifica que este logeado y tenga el rol de admin
    return res.error("Acceso denegado",401,"No tiene autorización");
  }
  next();
}

module.exports = verificarAdmin;
