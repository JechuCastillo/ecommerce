const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number },
    stock: { type: Number, default: 0 },
  },
  { collection: "productos" }
);

const producto = mongoose.model("Producto", productSchema);
module.exports = producto;
