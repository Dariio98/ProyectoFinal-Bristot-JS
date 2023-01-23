// Renderización del index
const mostrarProductos = () => {

    const contenedor = document.getElementById('container');

    productos.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('container__productos');
        div.innerHTML += `<div class="container__productos--menu">
        <img src="${producto.img}" alt="${producto.nombre}">
        <div class="container__productos--texto">
        <h3>${producto.nombre}</h3>
        <p class="container__productos--precio">$${producto.precio}</p>
        <p class="container__productos--ingrediente">${producto.descripcion}</p>
        </div>
        <button class="container__productos--boton" id="${producto.id}">Agregar al carrito</button>`

        contenedor.appendChild(div)
    });
    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}


// Creacion de botones para agrregar al carrito
function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".container__productos--boton");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};


let carrito;

let carritoStorage = localStorage.getItem("productos-carrito")


if (carritoStorage) {
    carrito = carritoStorage;
    carrito = JSON.parse(carritoStorage);
} else {
    carrito = [];
    
}
// Funcion para agregar al carrito
function agregarAlCarrito(e) {
    const idBoton = e.target.id;
    const productoCarrito = productos.find(producto => producto.id == idBoton);

    // validar productos agregados
    if (carrito.some(producto => producto.id == idBoton)) {
        const indice = carrito.findIndex(producto => producto.id == idBoton);
        carrito[indice].cantidad++;
    } else {
        productoCarrito.cantidad = 1;
        carrito.push(productoCarrito)
    }
    numerito();

    localStorage.setItem("productos-carrito", JSON.stringify(carrito))
}
const numerito = () => {
    let numero = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = numero
}
numerito();
mostrarProductos();