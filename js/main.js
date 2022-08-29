// Mostrar productos desde un JSON utilzando fetch
// codigo mostrar card antes de JSON//

let carritoDeCompras = []
let stockProductos = []
let contenedorProductos = document.getElementById('contenedor-productos')


const stockProductosJson = async () => {
    let response = await fetch('js/stock.json')
    let data = await response.json()
    console.log(response)
    console.log(data)
    stockProductos.push(...data)

    data.forEach(item => {
        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML = `<div class="card" id="${item.id}">
                            <img src="${item.img}" class="card-img-top" alt="${item.id}">
                            <div class="card-body">
                                <h5 class="card-title-nombre">${item.nombre}</h5>
                                <p class="card-text-marca">${item.marca}</p>
                                <p class="card-text-precio">$${item.precio}</p>
                                <a href="#" class="add-to-cart btn btn-primary">Agregar al carrito</a>
                            </div>
                        </div>          
                        `
        contenedorProductos.appendChild(div)
        cargarEventListener()
    })
}




stockProductosJson()
// mostrarProductos()
//Logica Ecommerce - armo cart para mostrar productos-- codigo anterior al json
/*function mostrarProductos() {
    stockProductos.forEach(item => {
        let div = document.createElement('div')
        div.className ='producto'
        div.innerHTML =`<div class="card" id="${item.id}">
                            <img src="${item.img}" class="card-img-top" alt="${item.id}">
                            <div class="card-body">
                                <h5 class="card-title-nombre">${item.nombre}</h5>
                                <p class="card-text-marca">${item.marca}</p>
                                <p class="card-text-precio">$${item.precio}</p>
                                <a href="#" class="add-to-cart btn btn-primary">Agregar al carrito</a>
                            </div>
                        </div>          
                        `
            contenedorProductos.appendChild(div)
    })
}*/



//abrir y cerrar carrito
const carrito = document.querySelector(".submenu");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
console.log(carrito);
//abrir
carrito.addEventListener("click", () => {
    if (cartModalOverlay.classList.contains("open")) {
        cartModalOverlay.classList.remove("open");
    } else {
        cartModalOverlay.classList.add("open");
    }
})
//cerrar
const closeBtn = document.querySelector("#close-btn");

closeBtn.addEventListener("click", () => {
    cartModalOverlay.classList.remove("open");
})

// agregar elementos al carrito
function cargarEventListener() {
    const addToCart = document.getElementsByClassName("add-to-cart");
    console.log(addToCart)
    for (let boton of addToCart) {
        boton.addEventListener("click", agregarCarrito)
    }
}

function agregarCarrito(e) {
    let boton = e.target;
    let producto = boton.parentElement.parentElement;
    let prodID = producto.getAttribute("id");
    // let prodName = producto.querySelector("h5").innerText;
    // let precio = producto.querySelector(".card-text-precio").innerText;
    // let img = producto.querySelector(".card-img-top").src;
    let productoObtenido = stockProductos.find(item => item.id == prodID)
    carritoDeCompras.push(productoObtenido)
    agregarElemento(productoObtenido)
}

function agregarElemento({ id, nombre, precio, img, unidad }) {
    let productRow = document.createElement("div");
    let contenedorProductos = document.querySelector(".product-rows");

    let elemProducto = `
        <div class="product-row" id="${id}">
            <img class="cart-image" src="${img}" />
            <span>${nombre}</span>
            <span class="cart-price"> $ ${precio}</span>
            <input class= "unidad" type="number" value="1">
            <button id="${id}" class="remove-btn">Borrar</button>
        </div>

    `
    productRow.innerHTML = elemProducto;
    contenedorProductos.append(productRow);
    let botonesBorrar = productRow.querySelectorAll(".remove-btn");
    for (let boton of botonesBorrar) {
        boton.addEventListener("click", borrarElemento);
    }
    localStorage.setItem('product-row', JSON.stringify(carritoDeCompras))

    //unidad de productos agregados
    productRow.querySelector('.unidad').addEventListener ('change', quantityChanged);

    cantElementosCarrito();
    precioTotal();
}

//borrar elemento del carrito
function borrarElemento(e) {
    btn = e.target;
    console.log(btn);
    btn.parentElement.parentElement.remove();
    carritoDeCompras = carritoDeCompras.filter(item => item.id != btn.id)
    localStorage.setItem('product-row', JSON.stringify(carritoDeCompras))
    cantElementosCarrito()
    precioTotal()
}


//mostrar cantidad de elementos sumados al carrito
function cantElementosCarrito() {
    let cantidad = document.querySelectorAll(".product-rows > div");
    let cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerText = cantidad.length;
}

//total precio carrito 
function precioTotal() {
    let totalCarrito = document.querySelectorAll(".cart-price");
    let totalPrice = document.querySelector(".total-price");
    totalPrice.innerText = '$' + carritoDeCompras.reduce((acc, prod,) => acc + parseInt(prod.precio), 0)
    //totalPrice.innerText = totalCarrito.length;
}

//Guardar elementos seleccionados en el carrito 
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('product-row')) {
        carritoDeCompras = JSON.parse(localStorage.getItem('product-row'))
        carritoDeCompras.forEach(item => {
            agregarElemento(item)
        })
    }
})

//no permitir negativos en unidades de productos del carrito
function quantityChanged(event) {
    const input = event.target;
    if (input.value <=0){
        input.value=1
    }
}
