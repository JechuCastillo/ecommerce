const jwt = require("../service/jwtService");
const Usuario = require("../models/usuario");
const { hashPassword } = require("../service/hashService");
async function login(req, res) {
  //Recibe el body del request
  const usuarioLogin = req.body;
  try {
    // Averigua si el usuario existe y las credenciales s((on correctas
    const resultado = await loginUsuario(usuarioLogin);
    res.cookie("token", resultado.token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 600000,
    });
    res.json(resultado); //En caso de exito devuelve el token
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function loginUsuario(usuarioLogin) {
  //Verifica que el usuario exista en la base de datos
  const usuarioBD = await Usuario.findOne({ email: usuarioLogin.email });
  if (!usuarioBD) {
    throw new Error("Credenciales invalidas");
  }
  //Si existe se hashea la contraseña con el salt del usuario de la Bd, para poder comparar
  const hash = hashPassword(usuarioLogin.password, usuarioBD.salt);
  if (!(hash === usuarioBD.password)) {
    throw new Error("Credenciales invalidas");
  }
  //Creación del token
  const payload = {
    id: usuarioBD.id,
    email: usuarioLogin.email,
    rol: usuarioBD.rol,
  };
  const token = jwt.generarToken(payload);

  return {
    token,
    user: { id: usuarioBD.id, email: usuarioLogin.email, rol: usuarioBD.rol },
  };
}

module.exports = { login };
