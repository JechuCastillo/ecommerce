const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const rolMiddleware = require("../middlewares/rolesMiddleware");
const {
  listarProductos,
  crearProducto,
  eliminarProducto,
  validarProducto,
} = require("../controllers/productoController");

router.get("/", authMiddleware,listarProductos);
router.post("/", authMiddleware,rolMiddleware, validarProducto, crearProducto);
router.delete("/:nombre",authMiddleware,rolMiddleware, eliminarProducto);
module.exports = router;
