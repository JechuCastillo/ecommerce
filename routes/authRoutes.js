const express = require("express");
const path = require("path");
const routerAuth = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const verificarAdmin = require("../middlewares/rolesMiddleware");
routerAuth.post("/login", authController.login);
routerAuth.get("/admin", authMiddleware, verificarAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "adminSite.html"));
});
routerAuth.get("/logout", authMiddleware, authController.logout);
routerAuth.get("/admin/check", authMiddleware, verificarAdmin, (req, res) => {
  res.status(200).json({ isAdmin: true });
});
routerAuth.get("/autenticado", authMiddleware, (req, res) => {
  res.status(200).json({ autenticado: true });
});
module.exports = routerAuth;
