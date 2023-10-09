let nombre 
do {
    nombre = prompt("Ingrese su nombre");

    if (nombre === "") {
        alert("Debe ingresar un nombre.");
    }
} while (nombre === "");
            alert("Bienvenido/a " + nombre);

let profesional;

do {
    profesional= prompt("¿Eres Profesional de la piel?").toLowerCase();
        if (profesional !== "si" && profesional !=="no") {
            alert("Respuesta no válida, por favor responda 'si' o 'no'.");
            }
    }
while (profesional!== "si" && profesional !== "no");

if (profesional === "si") {
    alert("Accederás a precios de profesional");
    productos = `1. Leche de limpieza $2500\n 2. Gel de Limpieza $3000\n 3. Exfoliante $4000\n 4. Tónico $2000`;
} else if (profesional === "no") {
    alert("Se te mostrarán los precios de cliente");
    productos = `1. Leche de limpieza $3000\n 2. Gel de Limpieza $4000\n 3. Exfoliante $5000\n 4. Tónico $3000`;
} else {
    alert("Respuesta no válida");
}

function enviarCorreo(correo, listaProductos) {
    alert(`El correo ha sido enviado a ${correo} con la lista de productos:\n${listaProductos}`);
} 

function listaDeOpciones() {
    let opcion;
    do {
        opcion = parseInt(prompt("Menú:\n" + "1. Precios\n" + "2. Comprar\n" + "3. Salir"));

        switch (opcion) {
            case 1:
                alert("Lista de precios:\n" + productos);
                break;
            case 2:
                let correo = prompt("Ingrese su correo para enviar la lista de precios");
                    if (correo === "") {
                    alert("Campo obligatorio. Por favor, ingrese su correo.");
                    } else {
                        enviarCorreo(correo, productos);
                    }
                    break;
            case 3:
                alert("Gracias por tu compra");
                break;
            default:
                alert("Opción no válida");
        }

    } while (opcion !== 3);
}

listaDeOpciones();