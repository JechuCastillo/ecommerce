const request = require("supertest");
const mongoose = require("mongoose");
const Usuario = require("../models/usuario");
const app = require("../app");
const userTest = {
  nombreUsuario: "Testeador",
  email: "tester@hotmail.com",
  password: "123456",
  rol: "cliente",
};
describe("Pruebas a API", () => {
  test("POST /api/usuarios/register responde con true", async () => {
    const res = await request(app)
      .post("/api/usuarios/register")
      .send(userTest);
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  test("GET /api/usuarios sin rol de admin, responde success:false", async () => {
    const res = await request(app).get("/api/usuarios");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
  afterAll(async () => {
    await Usuario.deleteOne({ nombreUsuario: "Testeador" });
    await mongoose.connection.close();
  });
});
