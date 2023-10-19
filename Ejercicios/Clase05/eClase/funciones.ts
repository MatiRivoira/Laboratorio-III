/// <reference path="./node_modules/@types/jquery/index.d.ts">

function Listar() {
    let url = "http://localhost:8008/productos_fotos";

    $.ajax({
        type:"GET",
        url: url,
        dataType: "JSON",
    })
    .done((objJSON:any)=>{
        //MUESTRO EL RESULTADO DE LA PETICION
        console.log(objJSON);

        let cadena = "";

        objJSON.forEach((elemento:any) => {
            console.log(elemento);
            if(elemento !== "")
            {
                let obj = JSON.parse(elemento);
                cadena += obj.codigo + " - " + obj.marca + " - " + obj.precio + " - " + obj.path + "<br>";
            }
        });

        $("#divListado").html(cadena);
       
    })
}

function Agregar() {
    let url = "http://localhost:8008/productos_fotos";
    let codigo = $("#codigo").val();
    let marca = $("#marca").val();
    let precio = $("#precio").val();
    let foto :any= $("#foto")[0];

    let form:FormData = new FormData();
    form.append("foto", foto.files[0]);
    form.append("obj", JSON.stringify({"codigo": codigo, "marca": marca, "precio": precio}));

    $.ajax({
        type:"POST",
        url: url,
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form
    })
    .done((rta)=>{
        alert(rta);
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });  
}