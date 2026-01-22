// =======================
// PRODUCTOS
// =======================
const productos = [
  { id: 1, nombre: "Six pack- Andina light 269ml + hielo", precio: 12499, imagen: "assets/img/andina_p.jpg" },
  { id: 2, nombre: "Six pack- Aguila light 269ml + hielo", precio: 13799, imagen: "assets/img/light-p.jpg" },
  { id: 3, nombre: "Six pack- Aguila Original 269ml + hielo", precio: 16250, imagen: "assets/img/aguila-p.jpg" },
  { id: 4, nombre: "Six pack- Coronita 210ml + hielo", precio: 22499, imagen: "assets/img/coronita-p.jpg" },
  //{ id: 5, nombre: "Six pack- Stella Artois 330ml + hielo", precio: 27799, imagen: "assets/img/stella-p.jpeg" },
  //{ id: 6, nombre: "Six pack- Heineken 250ml + hielo", precio: 21550, imagen: "assets/img/heineken.jpeg" },
  //{ id: 7, nombre: "Six pack- Costeña Bacana 330ml + hielo", precio: 18199, imagen: "assets/img/costeña.png" },
  //{ id: 8, nombre: "Whisky Buchanans Deluxe 12años + hielo + servicio", precio: 175000, imagen: "assets/img/buchana.png" },
  //{ id: 9, nombre: "Six pack- Budweiser lata + hielo", precio: 18399, imagen: "assets/img/bud-p.png" },
  //{ id: , nombre: "Six pack- Stella lata 330ml + hielo", precio: 3500, imagen: "assets/img/stella-l.jpeg" },
  //{ id: 10, nombre: "Caja Costeñita + cava y hielo", precio: 81000, imagen: "assets/img/cava-cos.png" },
  { id: 11, nombre: "Caja Andina light 269ml + cava y hielo", precio: 47499, imagen: "assets/img/cava-and.png" },
  { id: 12, nombre: "Caja Aguila light 269ml + cava y hielo", precio: 52499, imagen: "assets/img/cava-lig.png" },
  { id: 13, nombre: "Caja Aguila Original 269ml + cava y hielo", precio: 62499, imagen: "assets/img/cava-original.png" },
  { id: 14, nombre: "Caja Coronita 210ml + cava y hielo", precio: 87499, imagen: "assets/img/cava-cor.png" },
  //{ id: 15, nombre: "Caja Stella Artois 330ml + cava y hielo", precio: 108750, imagen: "assets/img/cava-ste.png" },
  //{ id: 16, nombre: "Caja Heineken 250ml + cava y hielo", precio: 83750, imagen: "assets/img/cava-hei.png" },
  //{ id: 17, nombre: "Caja Budweiser lata + cava y hielo", precio: 71000, imagen: "assets/img/cava-bud.png" }

];

let carrito = [];

// =======================
// REFERENCIAS DOM
// =======================
const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalTexto = document.getElementById("total");
const btnWhatsapp = document.getElementById("btn-whatsapp");

// =======================
// MOSTRAR PRODUCTOS
// =======================
function mostrarProductos() {
  listaProductos.innerHTML = "";

  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>$${formatearPrecio(prod.precio)}</p>

      <div class="controles">
        <button onclick="quitar(${prod.id})">-</button>
        <span id="cantidad-${prod.id}">0</span>
        <button onclick="agregar(${prod.id})">+</button>
      </div>
    `;

    listaProductos.appendChild(div);
  });
}

// =======================
// AGREGAR / QUITAR
// =======================
function agregar(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarVista();
}

function quitar(id) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad--;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);

    const cantidadSpan = document.getElementById(`cantidad-${id}`);
    if (cantidadSpan) cantidadSpan.textContent = 0;
  }

  actualizarVista();
}

// =======================
// ACTUALIZAR VISTA
// =======================
function actualizarVista() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    listaCarrito.innerHTML += `
      <p>🍺 ${item.nombre} x${item.cantidad} → $${formatearPrecio(subtotal)}</p>
    `;

    const cantidadSpan = document.getElementById(`cantidad-${item.id}`);
    if (cantidadSpan) cantidadSpan.textContent = item.cantidad;
  });

  totalTexto.textContent = `Total (no se incluye valor de domicilio): $${formatearPrecio(total)}`;
}

// =======================
// WHATSAPP
// =======================
btnWhatsapp.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Agrega productos primero 🍻");
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const referencia = document.getElementById("referencia").value;
  const metodoPago = document.querySelector('input[name="pago"]:checked')?.value;

  if (!nombre || !direccion) {
    alert("Por favor ingresa tu nombre y dirección");
    return;
  }

  let mensaje = `*Pedido ServiBeer*%0A%0A`;
  mensaje += `Cliente: ${nombre}%0A`;
  mensaje += `Dirección: ${direccion}%0A`;

  if (referencia) mensaje += `Referencia: ${referencia}%0A`;

  mensaje += `%0A*Pedido:*%0A`;

  carrito.forEach(item => {
    mensaje += `• ${item.nombre} x${item.cantidad} - $${formatearPrecio(item.precio * item.cantidad)}%0A`;
  });

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  mensaje += `%0A*Total (sin domicilio):* $${formatearPrecio(total)}`;
  mensaje += `%0A*Pago:* ${metodoPago}`;

  const telefono = "3332278728"; // TU NÚMERO
  const url = `https://wa.me/${telefono}?text=${mensaje}`;


  window.open(url, "_blank");
});

// =======================
// UTILIDADES
// =======================
function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO");
}

// INICIAR
mostrarProductos();





