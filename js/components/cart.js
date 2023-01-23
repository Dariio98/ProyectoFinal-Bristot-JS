// traemos los elementos del localStorage
let productosCarrito = localStorage.getItem("productos-carrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector('#carrito-vacio');
const carritoDeProductos = document.querySelector('#carrito-productos');
const carritoFuncionEliminar = document.querySelector('#carrito-funcion');
const carritoFuncionPrecio = document.querySelector('#carrito-funcion-precio');
const carritoFuncionComprar = document.querySelector('#carrito-funcion-comprar');
const botonEliminar = document.querySelectorAll('.carrito__producto--eliminar');
const botonVaciarCarrito = document.querySelector('#carrito__funcion--eliminar')
const cuentaTotal = document.querySelector('#total')
const botonComprarCarrito = document.querySelector('#carrito-funcion-comprar')


// Funcion para recargar los productos al borrar los elementos

function actualizarProductos() {
    
    if (productosCarrito && productosCarrito.length > 0) {
        // Visibilidad de elementos en la pagina del carrito
        carritoVacio.classList.add("disabled");
        carritoDeProductos.classList.remove("disabled");
        carritoFuncionEliminar.classList.remove("disabled");
        carritoFuncionComprar.classList.remove("disabled");
        carritoFuncionPrecio.classList.remove("disabled");

        carritoDeProductos.innerHTML = "";
        
        // renderizar carrito
        const contenedor = document.getElementById('carrito-productos')
        productosCarrito.forEach(producto => {
            const div = document.createElement('div')
            div.classList.add('carrito__producto--contenedor');
            div.innerHTML += `
            <div class="carrito__producto--comprar">
            <img src="../${producto.img}" alt="${producto.nombre}">
            <div class="carrito__producto--nombre">
            <h2>${producto.nombre}</h2>
            </div>
            <div class="carrito__producto--cantidad">
            <h2>Cantidad</h2>
            <p>${producto.cantidad}</p>
            </div>
            <div class="carrito__producto--precio">
                <h2>Precio</h2>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito__producto--subprecio">
            <h2>Subprecio</h2>
            <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito__producto--eliminar" id="${producto.id}"><i class="fa-solid fa-trash"></i></button>
            </div>`
            contenedor.appendChild(div);
        });
        actualizarBotonesEliminar();
        
    } else {
        carritoVacio.classList.remove("disabled");
        carritoDeProductos.classList.add("disabled");
        carritoFuncionEliminar.classList.add("disabled");
        carritoFuncionComprar.classList.add("disabled");
        carritoFuncionPrecio.classList.add("disabled");
    }
}
actualizarProductos();
totalCompra();


function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito__producto--eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductoCarrito);
    })
};
function eliminarProductoCarrito (e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id == idBoton)
    
    console.log(productosCarrito);
    productosCarrito.splice(index, 1);
    console.log(productosCarrito);
    
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    actualizarProductos();
    totalCompra();
    
}
botonVaciarCarrito.addEventListener("click",vaciarCarrito);
function vaciarCarrito () {
    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
    actualizarProductos();

}

function totalCompra() {
    const precioTotal = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${precioTotal}`;
    console.log(precioTotal);
}

botonComprarCarrito.addEventListener("click",comprar);
function comprar () {

    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Gracias por tu compra, podras retirarlo dentro de 40 minutos!',
    showConfirmButton: false,
    timer: 2500
    })

    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));



}

