export const producto =[
{
    id: 1,
    nombre: "Crema Hidratante",
    precio: 9500,
    categoria: "facial",
    imagen: "./multimedia/crema.jpg"
},
{
    id: 2,
    nombre: "Gel de Limpieza",
    precio: 8500,
    categoria: "facial",
    imagen: "./multimedia/gel.jpg"
},
{
    id: 3,
    nombre: "Scrub",
    precio: 9000,
    categoria: "corporal",
    imagen: "./multimedia/scrub.jpg"
},
{
    id: 4,
    nombre: "Serum de vitamina C",
    precio: 10000,
    categoria: "facial",
    imagen: "./multimedia/serum.jpg"
},
];
JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));


