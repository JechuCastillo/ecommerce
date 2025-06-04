const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    nombreUsuario: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    salt: { type: String },
    rol: { type: String },
  },
  { collection: "usuarios" }
);

const usuarioModel = mongoose.model("Usuario", usuarioSchema);
module.exports = usuarioModel;
