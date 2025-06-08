const formProducto = document.querySelector("#crear-producto");
formProducto.addEventListener("submit", crearProducto);

async function crearProducto(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre-product").value;
  const precio = document.querySelector("#precio-product").value;
  const stock = document.querySelector("#stock-product").value;
  const resultado = document.querySelector(".error-producto");
  try {
    const res = await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio, stock }),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error(data.error || "Error al crear el producto");
    }
    resultado.innerHTML = `<p>Producto agregado</p>`;
  } catch (err) {
    resultado.innerHTML = `<p>Error al agregar producto</p>`;
  }
}
