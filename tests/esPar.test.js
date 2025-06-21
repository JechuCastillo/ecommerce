const esPar = require("./utils/esPar");

describe("Funcion esPar()", () => {
  test("Mando 2, espera true", () => {
    expect(esPar(2)).toBe(true);
  });
  test("Mando 2, espera false", () => {
    expect(esPar(5)).toBe(false);
  });
});
