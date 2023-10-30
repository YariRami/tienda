function obtenerNombre() {
    let nombre;
    do {
        nombre = prompt("Ingrese su nombre");
        if (nombre === "") {
        alert("Debe ingresar un nombre.");
        }
    } 
    while (nombre === "");
    return nombre;
}
obtenerNombre()

class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    venta(cantidad) {
        if (cantidad > 0 && cantidad <= this.cantidad) {
            this.cantidad = this.cantidad - 1;
            console.log(`Has vendido ${cantidad} unidades de ${this.nombre}. Cantidad restante: ${this.cantidad}`);
        } else {
            console.log(`El producto ${this.nombre} está agotado.`);
        }
    }
}

const productos = [];
productos.push(new Producto("producto1", "Leche de limpieza", 2500, 50));
productos.push(new Producto("producto2", "Gel de limpieza", 3000, 100));
productos.push(new Producto("producto3", "Exfoliante", 4000, 50));
productos.push(new Producto("producto4", "Tónico", 2000, 30));

class Tienda {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    listaProductos() {
        console.log("Productos en la tienda:");
        this.productos.forEach((producto) => {
            console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}, Cantidad: ${producto.cantidad}`);
        });
    }

    buscarProducto(nombre) {
        return this.productos.find((producto) => producto.nombre === nombre);
    }
}
// Tienda
const tienda = new Tienda();

// Agregar productos a la tienda
tienda.agregarProducto(new Producto(1, "Leche de limpieza", 2500, 50));
tienda.agregarProducto(new Producto(2, "Gel de limpieza", 3000, 100));
tienda.agregarProducto(new Producto(3, "Exfoliante", 4000, 50));
tienda.agregarProducto(new Producto(4, "Tónico", 2000, 30));

// Lista de productos disponibles en la tienda
tienda.listaProductos();

// Venta de la tienda
const productoVendido = tienda.buscarProducto("Leche de limpieza");
if (productoVendido) {
    productoVendido.venta(5);
} else {
    console.log("El producto no se encuentra en la tienda.");
}
// Lista de productos actualizados
tienda.listaProductos();
