const main = document.querySelector("#productos");
let contador = 1;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

async function mostrarProductos() {
  try {
    const res = await fetch("/api/productos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const productos = await res.json();

    const tabla = document.querySelector("table");
    let nombre, stock, precio, boton;
    productos.data.forEach((producto) => {
      let nuevoProducto = document.createElement("tr");
      nuevoProducto.id = contador;
      nombre = document.createElement("td");
      nombre.id = contador;
      contador++;
      stock = document.createElement("td");
      precio = document.createElement("td");
      nombre.textContent = producto.nombre;
      precio.textContent = producto.precio;
      stock.textContent = producto.stock;
      nuevoProducto.appendChild(nombre);
      nuevoProducto.appendChild(precio);
      nuevoProducto.appendChild(stock);
      boton = document.createElement("button");
      boton.textContent = "Agregar al carrito";
      boton.addEventListener("click", botonAgregarCarrito);
      nuevoProducto.appendChild(boton);
      tabla.appendChild(nuevoProducto);
    });
  } catch (err) {
    console.log(err);
  }
  verCarrito();
}

//Funcion para agregar elementos al carrito con localStorage
function botonAgregarCarrito(event) {
  const nombreProducto = event.target.parentElement.children[0].textContent;
  const producto = {
    nombre: nombreProducto,
    precio: event.target.parentElement.children[1].textContent,
  };
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(carrito);
  verCarrito();
}

function verCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  const carritoList = document.querySelector("#carrito-list");
  carritoList.innerHTML = "";
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} $${producto.precio}`;
    carritoList.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded", mostrarProductos());
