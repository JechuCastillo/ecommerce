const { body, validationResult } = require("express-validator");
const Producto = require("../models/producto");

async function listarProductos(req, res) {
  //Devuelve todos los productos de la bd
  try {
    const productos = await Producto.find();
    res.success(productos);
  } catch (err) {
    res.error("Error al listar productos", 500);
  }
}

async function eliminarProducto(req, res) {
  //Busca un producto por su nombre que llegar por la URL
  try {
    const producto = await Producto.find({ nombre: req.params.nombre });
    if (producto.length === 0) {
      return res.error("Producto no encontrado", 404);
    }
    await Producto.deleteOne({ nombre: req.params.nombre });
    res.success(producto,201);
  } catch (err) {
    res.error("Error al eliminar producto", 500);
  }
}
async function crearProducto(req, res,next) {
  //Con Express validator validamos los datos que llegan por el request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //Si hay algun error, retorna error
    return res.error("Errores de validacion", 400, errors.array());
  }
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.success(guardado, 201);
  } catch (err) {
    next(err)
  }
}




const validarProducto = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ max: 100 })
    .withMessage("Maximo 100 caracteres"),

  body("precio")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser mayor a 0")
    .toFloat(),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser mayor a 0")
    .toInt(),
];
module.exports = {
  listarProductos,
  crearProducto,
  validarProducto,
  eliminarProducto,
};
