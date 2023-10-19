/// <reference path= "./libs/jquery/index.d.ts">

//Equivale al evento load
$(() => {

    $("#btnTraer").on("click", TraerListadoProducto);

});

function TraerListadoProducto() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8008/productos_db",
        dataType: "JSON",
    })
    .done((obj_array:any)=>{
        console.log(obj_array);
        let tabla:string = `<table class="table table-hover">
                            <tr>
                                <th>CÓDIGO</th><th>MARCA</th><th>PRECIO</th><th>FOTO</th><th>ACCIÓN</th>
                            </tr>`;
        obj_array.forEach((item:any) => {
            tabla += `<tr>
                        <td>${item.codigo}</td>
                        <td>${item.marca}</td>
                        <td>${item.precio}</td>
                        <td><img src="http://localhost:8008/${item.path}" width="50px" height="50px"<img></td>
                        <td><input type="button" value="Modificar" data-obj='${JSON.stringify(item)}' data-action="modificar">
                            <input type="button" value="Eliminar" data-obj='${JSON.stringify(item)}' data-action="eliminar"></td>
                      </tr>`;
        });
        tabla += "</table>";
        $("#divListado").html(tabla);

        $('[data-action="modificar"]').on("click", (function(){
            let objStr:any = $(this).attr("data-obj");
            let obj = JSON.parse(objStr);
            console.log(obj);
        }));

        $('[data-action="eliminar"]').on("click", (function(){
            let objStr:any = $(this).attr("data-obj");
            let obj = JSON.parse(objStr);
            console.log(obj);
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8008/productos_db",
                dataType: "text",
                data: objStr,
                contentType: "application/json"
            })
            .done((mensaje:any)=>{
                alert(mensaje);
            });
        }));
    });
    
}