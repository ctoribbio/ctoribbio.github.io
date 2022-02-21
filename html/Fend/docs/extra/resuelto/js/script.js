class Usuario{

    constructor(nombre,email,password,dni,edad,fechaAlta){
        this.nombre = nombre;
        this.password = password;
        this.dni = dni;
        this.edad = edad;
        this.fechaAlta = fechaAlta;
    }

}

var usuarios = new Array();
window.onload = function(){
    if(localStorage.getItem("usuarios") != undefined){
        usuarios = JSON.parse(localStorage.getItem("usuarios"));
        console.log(usuarios);
    }
}

function crearUsuario(nombre,email,password,dni,edad){
    var fecha = new Date();
    var u = new Usuario(nombre,email,password,dni,edad,fecha.getTime())
    usuarios.push(u);
    localStorage.removeItem("usuarios");
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


function validValue(length,value) {
    var error=0;
    if(value.trim()=='') {
        error = 1;
    }else if(value.trim().length<length) {
        error = 2;
    }
    return error
}

document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();
    validateForm(e.target);
})

document.getElementById("borrar").addEventListener("click", (e)=>{
    localStorage.clear();
})

document.getElementById("consultar").addEventListener("click", (e)=>{
  var nickname =   document.getElementById("nickname").value.trim();

    for(var usuario of usuarios){
        if(usuario.nickname == nickname){
            var table = document.getElementById("table");
            var th = 
            for(var i=0; i<Object.values(usuario).length;i++){

            }

        }
    }
})

function validateForm(form){
    const nombre = document.getElementById("nombre").value;
    const password = document.getElementById("password").value;
    const dni = document.getElementById("dni").value;
    const edad = document.getElementById("edad").value;
    var error = false;      
    if(validValue(8,password)==1||validValue(4,nombre)==1||validValue(9,dni)==1){
        error = true;
    }
    if(validValue(8,password)==2||validValue(4,password)==2||validValue(9,dni)==2){
        error = true;
    }
    if(error){
        alert("Errores en el formulario");
    }else{
        alert("Bienvenido");
        form.reset();
        crearUsuario(nombre,password,dni,edad);
    }

}