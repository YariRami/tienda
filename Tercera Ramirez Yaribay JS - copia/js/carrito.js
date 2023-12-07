
import { productosDisponibles } from "./main.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))
const vaciarCarrito = () => {
    carrito = [];
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    tablaCarrito();
};

document.addEventListener("DOMContentLoaded", () => {
    tablaCarrito()
})

let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const carritoDeCompras = document.getElementById("items")
const totalCarrito = document.getElementById("total")
const btnCarrito = document.getElementById("btnCarrito")
const carritoTabla = document.getElementById("carrito")

btnCarrito.addEventListener("click", () => {
    tablaCarrito()
    if(carritoTabla.style.display === "block"){
        carritoTabla.style.display = "none"
    }else{
        carritoTabla.style.display = "block"
    }


})

export const comprarProducto = (idProducto) => {
    return new Promise((resolve, reject) => {
        const producto = productosDisponibles.find((producto) => producto.id === idProducto);
        const { nombre, precio, id } = producto;

        const productoCarrito = carrito.find((producto) => producto.id === idProducto);

        if (productoCarrito === undefined) {
            const agregoProducto = {
                nombre: nombre,
                precio: precio,
                id: id,
                cantidad: 1,
            };
            carrito.push(agregoProducto);
            sessionStorage.setItem("carrito", JSON.stringify(carrito));
        } else {
            const indiceProducto = carrito.findIndex((producto) => producto.id === idProducto);

            carrito[indiceProducto].cantidad++;
            carrito[indiceProducto].precio = precio * carrito[indiceProducto].cantidad;

            sessionStorage.setItem("carrito", JSON.stringify(carrito));
        }
        carrito = JSON.parse(sessionStorage.getItem("carrito"));

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: `Usted compró el producto ${nombre}`,
            });
            resolve();
        }, 1000);
    });
};

const tablaCarrito = () => {

    carritoDeCompras.innerHTML= ''
    carrito.forEach(producto => {
        
        const { nombre, cantidad, precio, id} = producto

        let body = document.createElement("tr")

        body.className = "producto__carrito"

        body.innerHTML = `
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio/cantidad}</td>
        <td>${precio}</td>
        <td>
        <button id="+${id}" class="btn btn-success">+</button>
        <button id="-${id}" class="btn btn-danger">-</button>
        </td>
        `

        carritoDeCompras.append(body)

        const btnSumar = document.getElementById(`+${id}`)

        const btnRestar = document.getElementById(`-${id}`)

        btnSumar.addEventListener("click", () => sumarCantidad(id))

        btnRestar.addEventListener("click", () => restarCantidad(id))
    });

    dibujarTotal()
}
const dibujarTotal = () => {

    if(carrito.length > 0){
        totalCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Total:</b></th>
        <td></td>
        <td>${ generarTotal().cantidadTotal}</td>
        <td></td>
        <td>${generarTotal().precioTotal}</td>
        `
        totalCarrito.append(footer)
    }else {
        totalCarrito.innerHTML = "<h3>Carrito vacio</h3>"
    }
    }
const generarTotal = () => {
    const precioTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, { cantidad }) => total + cantidad, 0)

    return{
        precioTotal: precioTotal,
        cantidadTotal: cantidadTotal,
    }
}
const sumarCantidad = (id) => {
    const indexProducto = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProducto].precio / carrito[indexProducto].cantidad
    carrito[indexProducto].cantidad++
    carrito[indexProducto].precio = precio*carrito[indexProducto].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    tablaCarrito()
}


const restarCantidad = (id) => {
    const indexProducto = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProducto].precio / carrito[indexProducto].cantidad
    carrito[indexProducto].cantidad--
    carrito[indexProducto].precio = precio*carrito[indexProducto].cantidad

    if(carrito[indexProducto].cantidad === 0){
        carrito.splice(indexProducto, 1)
    }
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    tablaCarrito()
}