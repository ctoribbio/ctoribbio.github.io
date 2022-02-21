
//De la que la página carga, se hace una llamada a la funcion que obtiene los datos, que a continuacion llena el select 
window.onload = function () {
    getData(1);
}

//Funcion para poblar el select de los tipos de alojamiento, asignandole al boton un id, para ser concretos el id del tipo, que luego será utilizado
//Para llamar a otras funciones 

function poblarTipos(data) {
    for (var i = 0; i < data.length; i++) {
        var option = document.createElement('option');
        option.id = data[i].id;
        option.value = data[i].id;
        option.innerText = data[i].tipo;
        document.getElementById("tipo").appendChild(option);
    }
}

//Funcion para validar longitud del valor y que no esten vacios 



//Funcion para dibujar toda la informacion del alojamiento con el id que recibe como argumento, se iteran todos los elementos y si alguno coincide con el id, se guarda
//aparte
function masInfo(id, opciones, data) {
    var contenido = document.getElementById("content");

    contenido.remove();
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            var alojamiento = data[i];
        }
    }

    var preciototal = alojamiento.precioNoche * opciones[0] * opciones[1];
    var div = document.createElement("div");
    div.id = "masInfo";

    var button = document.createElement("button");
    button.addEventListener("click", (e) => {
        div.remove();
        document.body.appendChild(contenido);
    })
    button.innerText = "Volver";
    div.appendChild(button);

    var span = document.createElement("span");
    span.innerHTML = "<h1>Nombre del Alojamiento:" + alojamiento.nombre + "</h1>";
    div.appendChild(span);

    var span = document.createElement("span");
    span.innerHTML = "<h2>Lugar:" + alojamiento.lugar + "</h1>";
    div.appendChild(span);

    var span = document.createElement("span");
    span.innerHTML = "<h4>Descripcion:" + alojamiento.descripcion + "</h4>";
    div.appendChild(span);

    var span = document.createElement("span");
    span.innerHTML = "<h4>Servicios disponibles:<br>WIFI:" + alojamiento.servicios.wifi + "<br>TV:" + alojamiento.servicios.tv + "<br>Microondas:" + alojamiento.servicios.microondas + "<br>Piscina:" + alojamiento.servicios.piscina + "</h4>";
    div.appendChild(span);

    var span = document.createElement("span");
    span.innerHTML = "<h1>Precio Total:" + preciototal + "</h1>";
    div.appendChild(span);



    var span = document.createElement("span");
    span.innerHTML = "<img src=" + alojamiento.foto + "><br>";
    div.appendChild(span);

    var button = document.createElement("button");
    button.addEventListener("click", (e) => {
        reservar(alojamiento.nombre, alojamiento.lugar, opciones[2], preciototal);
    })
    button.innerText = "Reservar";
    div.appendChild(button);

    document.body.appendChild(div);



}

//funcion para validar el formulario usando el objeto form
function validateForm(form) {
    var opciones = new Array();

    var error = false;

    var numViajeros = form.numpersonas.value;
    var numNoches = form.numnoches.value;
    var date = form.dates.value;
    var errorT = document.getElementById("error")

    //Usamos un array de opciones para guardar las selecciones del usuario 

    opciones.push(numViajeros, numNoches, date, form.tipo.value);

    if (numViajeros.trim() == "") {
        errorT.textContent = ("El numero de viajeros no puede estar vacío")
        error = true;
    }
    if (numViajeros < 1) {
        errorT.textContent = ("El numero de viajeros no puede ser menor de uno ")
        error = true;
    }
    if (numNoches.trim() == "") {
        errorT.textContent = ("El numero de noches no puede estar vacío")
        error = true;
    }
    if (numNoches < 3) {
        errorT.textContent = ("El numero de noches no puede ser menor de tres ")
        error = true;
    }

    //Usamos el objeto date para que el usuario no pueda introducir una fecha ya pasada

    var dia = new Date(date);
    var today = new Date();
    if (dia < today) {
        errorT.textContent = ("El dia no puede ser hoy ni inferior a hoy");
        error = true;
    }
    if (date == "") {
        errorT.textContent = ("Seleccione una fecha");
        error = true;
    }

    if (form.tipo.value == "default") {
        error = true;
        errorT.textContent = "Selecciona una opcion de tipo de alojamiento"
    }

    if (!error) {
        getData(2, opciones);
        errorT.textContent = "";
    }




}

//Funcion de reserva mediante un POST que siempre sale por el error, que muestra un mensaje al usuario de que no ha sido posible enviar su reserna
function reservar(nombre, lugar, fecha, preciototal) {

    fetch('json/reservas.json', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            lugar: lugar,
            fecha: fecha,
            preciototal:preciototal
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => alert("No se ha enviado la reserva, intentelo de nuevo mas tarde"));
        
}

//Funcion para listar todos los alojamientos que cumplan la condicion del tipo 
function listarAlojamientos(data, opciones) {
    var table = document.createElement("table");
    table.id = "alojamientos";
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = "Nombre"
    tr.appendChild(th);

    var th = document.createElement("th");
    th.textContent = "Lugar"
    tr.appendChild(th);

    var th = document.createElement("th");
    th.textContent = "Precio"
    tr.appendChild(th);

    var th = document.createElement("th");
    th.textContent = "Mas informacion"
    tr.appendChild(th);
    table.appendChild(tr)

    //Comprobamos si el tipo del alojamiento iterado es el mismo que el seleccionado por el usuario y si es asi dibujamos la tabla de alojamientos disponibles 

    for (var i = 0; i < data.length; i++) {
        if (data[i].tipo == opciones[3]) {
            var tr = document.createElement("tr");

            var td = document.createElement("td");
            td.textContent = data[i].nombre;
            tr.appendChild(td)
            var td = document.createElement("td");
            td.textContent = data[i].lugar;
            tr.appendChild(td)
            var td = document.createElement("td");
            td.textContent = data[i].precioNoche;
            tr.appendChild(td)

            var td = document.createElement("td");
            var button = document.createElement("button");
            button.id = data[i].id;
            button.addEventListener("click", (e) => {
                masInfo(e.target.id, opciones, data);
            })
            button.textContent = "Mas Informacion";
            td.appendChild(button);
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }
    document.getElementById("content").appendChild(table);
}

//Funcion para obtener los datos, recibe dos argumentos, el modificador para seleccionar cual de las versiones se va a utilizar y otro para argumentos opcionales
//En este caso el array de opciones
function getData(mod, opt) {
    switch (mod) {
        case 1:
            fetch('json/tipos.json')
                .then(response => response.json())
                .then(data => {
                    poblarTipos(data);
                    console.log();
                })
            break;
        case 2:
            fetch('json/alojamientos.json')
                .then(response => response.json())
                .then(data => {
                    listarAlojamientos(data, opt);
                })
            break;
    }
}


//Evitamos que al hacer submit el formulario se vaya hacia el servidor, y si tenemos ya una tabla de alojamientos la borra
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm(document.getElementById("form"));
    if (document.getElementById("alojamientos") != undefined) {
        document.getElementById("alojamientos").remove();
    }
})