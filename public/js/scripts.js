const form = document.querySelector("#form-login");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  const mensaje = document.querySelector("#mensaje");
  try {
    const res = await fetch("/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data.data.token);
    if (!res.ok) {
      throw new Error(data.error || "Credenciales invalidas");
    }
    mensaje.innerHTML = `<p>"${data.data.token}"</p>`;
    setTimeout(() => {
      window.location.href = "../productos.html";
    }, 1500);
  } catch (err) {
    mensaje.innerHTML = `<p>ERROR AL INICIAR SESION</p>`;
  }
});

//Register

const formRegister = document.querySelector("#form-register");
formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  const registronombre = document.querySelector("#register-nombre").value;
  const registroemail = document.querySelector("#register-email").value;
  const registropassword = document.querySelector("#register-password").value;
  try {
    const res = await fetch("api/usuarios/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombreUsuario: registronombre,
        email: registroemail,
        password: registropassword,
      }),
    });
    const estado = await res.json();
    console.log(estado)
    const mensaje = document.querySelector("#mensaje-register");
    if (estado.success) {
      mensaje.textContent = "Cuenta creada con exito";
    } else {
      mensaje.textContent = "Fallo al crear la cuenta";
    }
  } catch (err) {
    console.log(err);
  }
});
