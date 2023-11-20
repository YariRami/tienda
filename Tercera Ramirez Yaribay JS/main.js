function obtenerNombre() {
    return localStorage.getItem('nombre');
}

function guardarNombre(nombre) {
    if (nombre !== "") {
        localStorage.setItem('nombre', nombre);
        return true;
    }
    return false;
}

const formNombre = document.getElementById('formNombre');
const nombreInput = document.getElementById('nombre');
const errorNombre = document.getElementById('errorNombre');

formNombre.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = nombreInput.value;
    if (guardarNombre(nombre)) {
        formNombre.reset();
    } else {
        errorNombre.style.display = 'block'; 
    }
});

const nombreUsuario = obtenerNombre();
if (nombreUsuario) {
    console.log("¡Bienvenido/a de nuevo, " + nombreUsuario + "!");
}

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    mostrarEnInicio() {
        const contenedorProductos = document.getElementById('contenedor-productos');

        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        const nombreProducto = document.createElement('h2');
        nombreProducto.textContent = this.nombre;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: $${this.precio}`;

        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(precioProducto);

        contenedorProductos.appendChild(divProducto);
    }
}

class Tienda {
    constructor() {
        const productosGuardados = localStorage.getItem('productos');
        this.productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    }

    guardarProductos() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }

    agregarProducto(producto) {
        this.productos.push(producto);
        this.guardarProductos();
    }

    listaProductos() {
        console.log("Productos en la tienda:");
        this.productos.forEach((producto) => {
            console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}`);
        });
    }

    buscarProducto(nombre) {
        return this.productos.find((producto) => producto.nombre === nombre);
    }
}

//Tienda
const tienda = new Tienda();

//Productos
tienda.agregarProducto(new Producto(1, "Leche de limpieza", 8500));
tienda.agregarProducto(new Producto(2, "Gel de limpieza", 8000));
tienda.agregarProducto(new Producto(3, "Exfoliante", 9000));
tienda.agregarProducto(new Producto(4, "Tónico", 7000));
tienda.agregarProducto(new Producto(5, "Serum Vitamina C", 10000));
tienda.agregarProducto(new Producto(6, "Crema Hidratante", 9000));
tienda.agregarProducto(new Producto(7, "Scrub", 10000));
tienda.agregarProducto(new Producto(8, "Set Antiojeras", 12000));
tienda.agregarProducto(new Producto(9, "Serum con Hyaluronico", 12000));
tienda.agregarProducto(new Producto(10, "Demaquillante", 6000));

//Productos disponibles en la tienda
tienda.listaProductos();

//Lista productos actualizados
tienda.listaProductos();

document.addEventListener('DOMContentLoaded', () => {
    tienda.productos.forEach(producto => {
        producto.mostrarEnInicio();
    });
});
