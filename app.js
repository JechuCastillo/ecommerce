const express = require("express");
//const jwt = require("jsonwebtoken");
require("dotenv").config(); //Dotenv para manejar variables de entorno
const connectDB = require("./config/db"); //conexion a mongodb
const responseHandler = require("./middlewares/responseHandler");
const errorHandler = require("./middlewares/errorHandler"); 
const cookies = require("cookie-parser"); //Cookies para poder utilizar las cookies
const cors  = require("cors"); //Cors para usar mi frontend en react
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); //Ayuda al servidor a "Hablar en JSON"
app.use(responseHandler);
app.use(express.static("public"));//Expone/sirve contenido estatico (frontend)
connectDB();
app.use(cookies());
app.use(cors({credentials:true , origin:"http://localhost:5173"}));
//rutas
const usuarioRouter = require("./routes/usuarioRouter");
const authRouter = require("./routes/authRoutes");
const productoRouter = require("./routes/productoRouter");

//Uso de rutas
app.use("/api/productos", productoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/usuarios", authRouter);

app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo: http://localhost:${PORT}`);
});
//Manejo de errores
app.use(errorHandler);


module.exports = app;
