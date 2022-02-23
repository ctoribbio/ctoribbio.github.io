window.onload = function () {
    getData(1);
}

document.getElementById("pais").addEventListener("change", (e)=>{
    var div = document.createElement("div");
    div.id = "eee";
    div.innerHTML = '<select id="provincia" ><option value="default" selected>Seleccione una provincia</option></select><br><input type="text" id="direccion" name="direccion" placeholder="Direccion" required><br><input type="number" id="codigoPostal" placeholder="Codigo Postal" required><br>'
    if(document.forms["contacto"]["pais"].value == "Spain"){
        document.forms["contacto"]["pais"].insertAdjacentElement("afterend",div);
        getData(2);
    }else{
        if(document.getElementById("eee")!=null){

            document.getElementById("eee").remove();
        }
    }
})

function getData(mod, id) {
    switch (mod) {
        case 1:
            fetch('json/names.json')
                .then(response => response.json())
                .then(data => {
                    poblarPais(data);
                    console.log();
                })
            break;
        case 2:
            fetch('json/provincias.json')
                .then(response => response.json())
                .then(data => {
                    poblarProvincia(data.facet_groups[0].facets);
                    console.log();
                })
            break;
    }
}

function poblarPais(data) {
    var select = document.getElementById("pais");
    
    var nombres = new Array();
    for(var i = 0; i < Object.keys(data).length; i++) {
        nombres.push(data[Object.keys(data)[i]]);
    }
    nombres.sort();
    var codigos = Object.keys(data);
    for (var i = 0; i < nombres.length; i++) {
        var option = document.createElement("option");
        option.id = nombres[i];
        option.value = nombres[i];
        option.textContent = nombres[i];
        select.appendChild(option);
    }
}

function poblarProvincia(data) {
    var select = document.getElementById("provincia");

    for(var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.id = data[i].name;
        option.textContent = data[i].name;
        select.appendChild(option);
    }
}

function validarForm() {
    var bool=false;
    form = document.forms["contacto"];
    name = form["nombre"].value.trim();
    apellidos = form["apellidos"].value.trim();
    telefono = form["telf"].value.trim();
    if(form["codigoPostal"]!=undefined) {

        codigoPostal = form["codigoPostal"].value.trim();
    }
    website = form["website"].value.trim();
    asunto = form["asunto"].value.trim();
    mensaje = form["mensaje"].value.trim();
    politica = form["politica"].value;
    pais = form["pais"].value.trim();
    var array = new Array();
    if(name.length <2){
        bool = true;
        alert("El nombre no puede tener menos de 2 caracteres");
    }

    if(form["codigoPostal"]!=undefined && bool==false) {
    array.push(name,apellidos,telefono,pais,codigoPostal,website,asunto,mensaje);
    enviarForm(array,1);
    }else if(!bool) {
        array.push(name,apellidos,telefono,pais,website,asunto,mensaje);
        enviarForm(array,2);
    }else{
        alert("Errores en el formulario");
    }    
    
}


function enviarForm(array,mod){
    alert("Mensaje procesado");
    if(mod==1){
        fetch('json/contacto.json', {
            method: 'POST',
          body: JSON.stringify({
              nombre: array[0],
              apellidos: array[1],
              telefono: array[2],
              pais: array[3],
              codigoPostal: array[4],
              website: array[5],
              asunto: array[6],
              mensaje: array[7],
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then(alert("Mensaje enviado"))
            .catch((err) => alert("El mensaje no ha podido ser enviado"));
    }else{
        fetch('json/contacto.json', {
            method: 'POST',
          body: JSON.stringify({
              nombre: array[0],
              apellidos: array[1],
              telefono: array[2],
              pais: array[3],
              website: array[4],
              asunto: array[5],
              mensaje: array[6],
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => alert("Mensaje enviado"))
            .catch((err) => alert("El mensaje no ha podido ser enviado"));
    }
    
}

document.getElementById("contacto").addEventListener("submit", (e)=>{
    e.preventDefault();
    validarForm();
})