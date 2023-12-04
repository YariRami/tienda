import { producto } from "../db/productos.js";
import { comprarProducto } from "./carrito.js";

const userLogin = document.getElementById("userLogin");
const divProductos = document.getElementById("productos");
const filtroInput = document.getElementById("filtro__input");
const filterLista = document.getElementById("filter__lista");

export let productosDisponibles = JSON.parse(localStorage.getItem("productos"));

export const cargarProductos = () => {
    return new Promise((resolve, reject) => {
        const productos = JSON.parse(localStorage.getItem("productos"));
        if (productos) {
            resolve(productos);
        } else {
            reject(new Error("No se pudieron cargar los productos"));
        }
    });
};
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

export const generarCardsProductos = (productos) => {
    divProductos.innerHTML = "";

    productos.forEach((producto) => {
        const { nombre, precio, id, imagen } = producto;

        let card = document.createElement("div");
        card.className = "producto";
        card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                <img src="${imagen}" class="card-img-top" alt="${nombre}">
                    <p class="card-title">${nombre}</p>
                    <p class="card-text">Precio: <b>$${precio}</b></p>
                    <button id="comprar${id}" class="btn btn-primary">Comprar</button>
                </div>
            </div>`;

        divProductos.appendChild(card);

        const btnCompra = document.getElementById(`comprar${id}`);
        btnCompra.addEventListener("click", () => comprarProducto(id));
    });
};

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
