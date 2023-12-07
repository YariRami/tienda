const btnReg = document.getElementById("btnReg")
const formRegistro = document.getElementById("user__register")
const formLogin = document.getElementById("user__login")
const btnLog = document.getElementById("btnLog")


let usuarios = JSON.parse(localStorage.getItem("usuarios"))

class newUser {
    constructor (user, pass){
        this.id = usuarios.length + 1
        this.user = user
        this.pass = pass
        this.admin = false
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('user__login');
    const formRegistro = document.getElementById('user__register');

btnLog.addEventListener("click", (e) => {
    e.preventDefault()

    const user = formLogin.children[0].children[1].value
    const pass = formLogin.children[1].children[1].value

    validarIngreso(user, pass)
})

const validarIngreso = (user, pass) => {
    const userExiste = usuarios.find((usuario) => usuario.user === user)
    if(userExiste === undefined || userExiste.pass !== pass){
        Swal.fire({
            icon: 'error',
            title: 'Error en usuario o contraseña',
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: `Bienvenido ${user}`,
        });

        let usuario = {
            user: userExiste.user,
            pass: userExiste.pass,
            admin: userExiste.admin,
        }

        sessionStorage.setItem("usuario", JSON.stringify(usuario))
        location.href = "./index.html"
    }
}

btnReg.addEventListener("click", (e) => {
    e.preventDefault();

    const user = formRegistro.children[0].children[1].value;
    const pass = formRegistro.children[1].children[1].value;

    const nuevoUsuario = new newUser(user, pass);

    validarYRegistrar(nuevoUsuario);
});

const validarYRegistrar = (nuevoUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioExistente = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user);

    if (!usuarioExistente) {
        usuarios.push(nuevoUsuario); 
        localStorage.setItem("usuarios", JSON.stringify(usuarios)); 

        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
        alert(`Gracias ${nuevoUsuario.user} por registrarse, será redirigido al inicio`);
        location.href = "./index.html";
    } else {
        alert(`El usuario ya existe`);
    }
};})