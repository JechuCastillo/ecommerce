const express = require("express");
const routerAuth = express.Router();
const authController = require("../controllers/authController");
routerAuth.post("/login", authController.login);
module.exports = routerAuth;
