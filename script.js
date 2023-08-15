class Indumentaria {
  constructor() {
    this.productos = [];
  }

  agregarProducto(producto) {
    this.productos.push(producto);
    console.log(this.productos);
  }
}

const indumentaria = new Indumentaria();

const producto1 = {
  nombre: "Remera manga larga",
  precio: 3500,
  talle: "XL",
  imagen: "https://www.digitalsport.com.ar/files/products/5aff36c0b505b-447867-1200x1200.jpg"
};

const producto2 = {
  nombre: "Bermuda",
  precio: 4000,
  talle: 42,
  imagen: "https://tse1.mm.bing.net/th?id=OIP.AcHXdfqHRS9m4-xmbpMkGQHaIV&pid=Api&P=0&h=180"
};

const producto3 = {
  nombre: "Boxer",
  precio: 1800,
  talle: 10,
  imagen:"https://tse4.mm.bing.net/th?id=OIP._6N-yq4GsPsSs6MCVR3T0QHaHa&pid=Api&P=0&h=180"
};

const producto4 = {
  nombre: "Remera manga corta",
  precio: 2750,
  talle: "XL",
  imagen:"https://tse2.mm.bing.net/th?id=OIP.MMv2Yzr4uLRltaBEFZR82QHaHa&pid=Api&P=0&h=180"
};

const producto5 = {
  nombre: "Campera frizada",
  precio: 9800,
  talle: "M",
  imagen:"https://tse3.mm.bing.net/th?id=OIP.nxTRL_fURAwaxc8KQBDa9gHaFj&pid=Api&P=0&h=180"
};

indumentaria.agregarProducto(producto1);
indumentaria.agregarProducto(producto2);
indumentaria.agregarProducto(producto3);
indumentaria.agregarProducto(producto4);
indumentaria.agregarProducto(producto5);

function mostrarAlerta() {
  Swal.fire({
    title: 'Tienda Outlet',
    text: '¡Muchas gracias por su compra!',
  });
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

function agregarProducto(nombre, precio, talle) {
  let nuevoProducto = {
    nombre: nombre,
    precio: precio,
    talle: talle 
  };
  carrito.push(nuevoProducto);
  total += precio;

  const carritoList = document.getElementById("carrito-list");
  const listItem = document.createElement("li");
  listItem.textContent = `${nombre} - $${precio.toFixed(2)}`;
  carritoList.appendChild(listItem);

  const totalPagar = document.getElementById("total-pagar");
  totalPagar.textContent =  total.toFixed(2);

  const carritoJSON = JSON.stringify(carrito);
  const totalJSON = JSON.stringify(total);
  localStorage.setItem("carrito", carritoJSON);
  localStorage.setItem("total", totalJSON);
}

document.addEventListener("DOMContentLoaded", function () {
  const productosList = document.getElementById("productos-list");

  for (const producto of indumentaria.productos) {
    const listItem = document.createElement("li");
    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    listItem.appendChild(imagenProducto);
    imagenProducto.style.width = "100px"; 
    imagenProducto.style.height = "auto";

    const infoContainer = document.createElement("div");
    const nombrePrecio = document.createElement("span");
    nombrePrecio.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
    infoContainer.appendChild(nombrePrecio);

    const addButton = document.createElement("button");
    addButton.textContent = "Agregar al carrito";
    addButton.addEventListener("click", () => {
      agregarProducto(producto.nombre, producto.precio, producto.talle);
    });
    infoContainer.appendChild(addButton);

    listItem.appendChild(infoContainer);
    productosList.appendChild(listItem);
  }
});



// Función que retorna una promesa para simular una compra
function confirmarCompra() {
  return new Promise(function(resolve, reject) {
    // Simulamos una operación asincrónica con un retardo de 2 segundos
    setTimeout(function() {
      const carritoList = document.getElementById("carrito-list");
      carritoList.innerHTML = "";
      localStorage.removeItem("carrito");
      localStorage.removeItem("total");
      const totalPagar = document.getElementById("total-pagar");
      totalPagar.textContent = "0.00";
      mostrarAlerta();
      resolve();
    }, 1000);
  });
}

//document.getElementById("comprar").addEventListener("click", comprar);
document.getElementById('comprarBoton').addEventListener('click', function() {
  // Simula la compra y actualiza el mensaje en el DOM cuando se complete
  confirmarCompra()
    .then(function() {
      mostrarAlerta()
    })
    .catch(function(error) {
      console.error('Ocurrió un error:', error);
  })
});
