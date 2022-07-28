let carritoDeCompras =[]

let contenedorProductos = document.getElementById('contenedor-productos')


mostrarProductos()

//Logica Ecommerce - armo cart para mostrar productos
function mostrarProductos() {
    stockProductos.forEach(item => {
        let div = document.createElement('div')
        div.className ='producto'
        div.innerHTML =`<div class="card" id="${item.id}">
                            <img src="${item.img}" class="card-img-top" alt="producto1">
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
}


//abrir y cerrar carrito
const carrito = document.querySelector(".submenu");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
console.log(carrito);
//abrir
carrito.addEventListener("click", () =>{
    if(cartModalOverlay.classList.contains("open")){
        cartModalOverlay.classList.remove("open");
    }else{
        cartModalOverlay.classList.add("open");
    }
})
//cerrar
const closeBtn = document.querySelector("#close-btn");

closeBtn.addEventListener("click", ()=>{
    cartModalOverlay.classList.remove("open");
})

// agregar elementos al carrito
const addToCart = document.getElementsByClassName("add-to-cart");
console.log(addToCart)
for(let boton of addToCart) {
    boton.addEventListener("click", agregarCarrito)
}
function agregarCarrito(e){
    let boton = e.target;
    let producto = boton.parentElement;
    let prodID = producto.getAttribute("id");
    console.log(prodID); //genera null y a partir de aca genera error 
}
    /*let prodName = producto.querySelector("h5").innerText;
    let precio = producto.querySelector(".card-text-precio").innerText;
    let img = producto.querySelector(".card-img-top").src;
    agregarElemento(prodID,prodName,precio,img)
}

/*function agregarElemento(prodID,prodName,precio,imagen) {
    let productRow = document.createElement("div");
    let contenedorProductos = document.querySelector(".product-rows");

    let elemProducto = `
        <div class="product-row" id="${prodID}">
            <img class="cart-image" src="${img}" />
            <span>${prodName}</span>
            <span class="cart-price">${precio}</span>
            <button class="remove-btn">Borrar</button>
        </div>
    `
    productRow.innerHTML = elemProducto;
    contenedorProductos.append(productRow);
    let botonesBorrar = productRow.querySelectorAll(".remove-btn");
    for(let boton of botonesBorrar) {
        boton.addEventListener("click", borrarElemento);
    }
    cantElementosCarrito();
}
function borrarElemento(e) {
    btn = e.target;
    btn.parentElement.parentElement.remove();
    cantElementosCarrito()
}

function cantElementosCarrito() {
    let cantidad = document.querySelectorAll(".product-rows > div");
    let cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerText = cantidad.length;

}*/

