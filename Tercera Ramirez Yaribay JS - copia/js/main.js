
import { comprarProducto } from "./carrito.js";

const userLogin = document.getElementById("userLogin");
const divProductos = document.getElementById("productos");
const filtroInput = document.getElementById("filtro__input");
const filterLista = document.getElementById("filter__lista");
export let productosDisponibles = [];

let listado = document.getElementById("listado");

fetch("./js/productos.json")
    .then((response) => response.json())
    .then((data) => {
        productosDisponibles = data; // Asignamos los productos obtenidos al array
        data.forEach((item) => {
            const li = document.createElement("li");
            li.classList.add('listado')
            li.innerHTML = ` 
            <div class="card" style="width: 18rem;">
            <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
            <p class="card-title">${item.nombre}</p>
            <p class="card-text">Precio: <b>$${item.precio}</b></p>
            <button id="comprar${item.id}" class="btn btn-primary">Comprar</button>
            </div>
            </div>
            `;
            listado.appendChild(li);
                    const btnCompra = document.getElementById(`comprar${item.id}`);
        btnCompra.addEventListener("click", () => comprarProducto(item.id));

        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos()
        .then((productos) => {
            generarCardsProductos(productos);
        })
        .catch((error) => {
            console.error(error);
        });
});

let sesionIniciada = JSON.parse(sessionStorage.getItem("usuario"))

document.addEventListener("DOMContentLoaded", () => {

    if(sesionIniciada === null){
        const a = document.createElement("a")
        a.href = "./usuarios.html"
        a.innerHTML = "Login"
        userLogin.appendChild(a)
    }else{
        const p = document.createElement("p")

        const close = document.createElement("button")

        p.innerHTML = `Bienvenido ${sesionIniciada.user}`
        close.id = "cerrar__sesion"
        close.innerHTML = "cerrar sesion"
        close.addEventListener("click", () =>{
            Swal.fire({
                title: `Gracias por su compra ${sesionIniciada.user}`,
                text: "Cerrando sesión",
                icon: "success",
                timer: 8000,
            });
            sessionStorage.removeItem("usuario")
            location.reload()
        })
        userLogin.appendChild(p)
        userLogin.appendChild(close)

    }

    generarCardsProductos(productosDisponibles);
});


//Filtro por input 

filtroInput.addEventListener("keyup" , (e) => {
    const productosFiltro = productosDisponibles.filter((producto) => producto.nombre.toLowerCase().includes(e.target.value))

    productosDisponibles = productosFiltro

    if(e.target.value !== ""){
        generarCardsProductos(productosFiltro)
    }else{
        productosDisponibles = JSON.parse(localStorage.getItem("productos"))
        generarCardsProductos(productosDisponibles)
    }
})

// Filtro por pick en lista
filterLista.addEventListener("click" , (e) => {
    const productosFiltro = productosDisponibles.filter((producto) => producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
})

    productosDisponibles = productosFiltro

    if(e.target.innerHTML !== ""){
        generarCardsProductos(productosFiltro)
    }else{
        productosDisponibles = JSON.parse(localStorage.getItem("productos"))
        generarCardsProductos(productosDisponibles)
    }

    export const filtrarPorCategoria = (categoria) => {
        return new Promise((resolve, reject) => {
            const productosFiltrados = productosDisponibles.filter(
                (producto) => producto.categoria.toLowerCase().includes(categoria.toLowerCase())
            );
            if (productosFiltrados.length > 0) {
                resolve(productosFiltrados);
            } else {
                reject(new Error("No se encontraron productos para esa categoría"));
            }
        });
    };
    
    filterLista.addEventListener("click", (e) => {
        const categoria = e.target.innerHTML.toLowerCase();
        filtrarPorCategoria(categoria)
            .then((productosFiltrados) => {
                generarCardsProductos(productosFiltrados);
            })
            .catch((error) => {
                console.error(error);
            });
    });
    