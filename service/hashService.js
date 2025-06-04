const crypto = require("crypto");
function hashPassword(password, salt) { //
  //Crea el hash con la contraseña del usario y la "sal" que le mandamos
  //Utiliza el algoritmo sha256
  //Devuelve el resultado en hexadecimal
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return hash;
}

module.exports= {hashPassword};
