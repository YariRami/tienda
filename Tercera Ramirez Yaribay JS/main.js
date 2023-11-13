function obtenerNombre() {
    let nombre = localStorage.getItem('nombre');
    do {
        nombre = prompt("Ingrese su nombre");
        if (nombre === "") {
            alert("Debe ingresar un nombre.");
        }
    } while (nombre === "");
    localStorage.setItem('nombre', nombre);
    return nombre;
}

const nombreUsuario = obtenerNombre();

class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    venta(cantidad) {
        if (cantidad > 0 && cantidad <= this.cantidad) {
            this.cantidad -= cantidad;
            console.log(`Has vendido ${cantidad} unidades de ${this.nombre}. Cantidad restante: ${this.cantidad}`);
            return true;
        } else {
            console.log(`El producto ${this.nombre} está agotado o la cantidad ingresada no es válida.`);
            return false;
        }
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
            console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}, Cantidad: ${producto.cantidad}`);
        });
    }

    buscarProducto(nombre) {
        return this.productos.find((producto) => producto.nombre === nombre);
    }
}

//Tienda
const tienda = new Tienda();

//Productos
tienda.agregarProducto(new Producto(1, "Leche de limpieza", 2500, 50));
tienda.agregarProducto(new Producto(2, "Gel de limpieza", 3000, 100));
tienda.agregarProducto(new Producto(3, "Exfoliante", 4000, 50));
tienda.agregarProducto(new Producto(4, "Tónico", 2000, 30));

// Productos disponibles en la tienda
tienda.listaProductos();

// Venta
const productoVendido = tienda.buscarProducto("Leche de limpieza");
if (productoVendido) {
    productoVendido.venta(5);
} else {
    console.log("El producto no se encuentra en la tienda.");
}

// Lista productos actualizados
tienda.listaProductos();