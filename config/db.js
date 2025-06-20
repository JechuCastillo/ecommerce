const { mongoose } = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.log("Error al connectar la base de datos");
    process.exit(1);
  }
};

module.exports = connectDB;
