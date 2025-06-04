const Usuario = require("../models/usuario");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const { hashPassword } = require("../service/hashService");
async function obtenerUsuarios(req, res) {
  //Obtiene todos los usuarios de la BD
  try {
    const usuarios = await Usuario.find().select("-salt");
    if (usuarios.length === 0) {
      //Si el array esta vacio retorna este mensaje
      return res.succes({ data: "Sin ususarios" });
    }
    //Retorna los usuarios
    res.success(usuarios);
  } catch (error) {
    res.error(error.message);
  }
}

async function crearUsuario(req, res) {
  const error = validationResult(req); //Validación de datos que llegan en el request 
  if (!error.isEmpty()) {
    //Si hay errores, lo devuelve
    return res.error("Error al crear usuario", 400, error.array());
  }
  const salt = crypto.randomBytes(16).toString("hex"); //Genera la "sal", un hash random para darle mas seguridad al hash del password.
  const password = hashPassword(req.body.password, salt); //Utiliza mi servicio de Hash para hashear el password antes de almacenarlo.
  try {
    const nuevoUsuario = await new Usuario({ // Crea el nuevo usuario en la BD
      nombreUsuario: req.body.nombreUsuario,
      email: req.body.email,
      salt: salt,
      password: password,
      rol: "cliente",
    });
    await nuevoUsuario.save(); // Se guarda en la BD
    res.success(nuevoUsuario);//retorna el usuario creado
  } catch (error) {
    res.error("Error al crear usuario");
  }
}
async function eliminarUsuario(req, res) {
  try {
    const usuario = await Usuario.findOneAndDelete({ //Busca y borra un usuario por su nombre de usuario
      nombreUsuario: req.params.nombreUsuario,
    });
    if (!usuario) { //Si no lo encuentra, devuelve error
      return res.error("Usuario no encontrado",404);
    }
    res.success(usuario); //Se retorna el usuario eliminado
  } catch (error) {
    res.error("Error al eliminar usuario");
  }
}

async function actualizarUsuario(req, res) {
  const usuarioParam = req.params.nombreUsuario; //Recibe por parametro el nombre del usuario a actualizar
  const errors = validationResult(req); //Se validan los datos que llegan del request
  if (!errors.isEmpty()) { //Si hay errores, se devuelve el error
    return res.error("Datos nuevos no validos", 400, errors.array());
  }
  //En caso de estar todo bien guardamos los datos nuevos para actualizar los viejos
  const datosActualizados = req.body;

  try {
    const usuario = await Usuario.findOneAndUpdate( //Se busca y actualiza el usuario correspondiente
      { nombreUsuario: usuarioParam },
      datosActualizados,
      { new: true } //Bandera que avisa que hay que guardar nuevamente ese usuario
    );
    if (!usuario) {
      return res.error("Usuario no encontrado");
    }
    res.success(usuario);
  } catch (error) {
    res.error("Error al actualizar el usuario");
  }
}

const validarUsuarioNuevo = [
  body("nombreUsuario")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage("Minimo 5 caracteres y maximo 15 caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Recuerdo que un email tiene el formato algo@algo.algo"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Minimo 6 caracteres"),
];
module.exports = {
  obtenerUsuarios,
  crearUsuario,
  eliminarUsuario,
  actualizarUsuario,
  validarUsuarioNuevo,
};
