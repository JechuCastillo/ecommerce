const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const rolMiddleware = require("../middlewares/rolesMiddleware");
const {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  validarUsuarioNuevo,
} = require("../controllers/usuarioController");

router.post("/register", validarUsuarioNuevo, crearUsuario);
router.get("/", authMiddleware, rolMiddleware, obtenerUsuarios);
router.put("/:nombreUsuario", actualizarUsuario);
router.delete("/:nombreUsuario", authMiddleware, rolMiddleware, eliminarUsuario);

module.exports = router;
