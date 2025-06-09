const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const connectDB = require("./config/db");
const responseHandler = require("./middlewares/responseHandler");
const errorHandler = require("./middlewares/errorHandler");
const cookies = require("cookie-parser");
// const authMiddleware = require("./middlewares/authMiddleware");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(responseHandler);
app.use(express.static("public"));
connectDB();
app.use(cookies());
//rutas
const usuarioRouter = require("./routes/usuarioRouter");
const authRouter = require("./routes/authRoutes");
const productoRouter = require("./routes/productoRouter");

app.use("/api/productos", productoRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/usuarios", authRouter);
// app.get("/protegida", authMiddleware, (req, res) => {
//   res.json({ message: `Hola, ${req.user.email}` });
// });
app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo: http://localhost:${PORT}`);
});
app.use(errorHandler);

// app.get("/usuarios",async (req,res)=>{
//   try {
//     const users = await Usuario.find();
//     res.send(users);
//   } catch (error) {
//     console.log("Error al mostrar usuarios");
//   }
// })

module.exports = app;
