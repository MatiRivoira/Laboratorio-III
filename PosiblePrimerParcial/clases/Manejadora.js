"use strict";
/// <reference path="./node_modules/@types/jquery/index.d.ts">
/// <reference path="Iparte2.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarAutoJSON() {
            let patente = $("#patente").val();
            let marca = $("#marca").val();
            let color = $("#color").val();
            let precio = $("#precio").val();
            if (marca !== "" && color !== "" && precio != null) {
                let form = new FormData();
                form.append("patente", patente);
                form.append("marca", marca);
                form.append("color", color);
                form.append("precio", precio);
                $.ajax({
                    type: "POST",
                    url: "./backend/altaAutoJSON.php",
                    dataType: "text",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form
                })
                    .done((respuesta) => {
                    alert(respuesta);
                    console.log(respuesta);
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                    console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });
            }
            else {
                alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
            }
        }
        static MostrarAutosJSON() {
            $.ajax({
                type: "GET",
                url: "./backend/listadoAutosJSON.php",
                dataType: "json",
            })
                .done((respuesta) => {
                // Limpiamos el contenido anterior del div
                $("#divTabla").html("");
                // Verificamos si la respuesta contiene datos
                if (respuesta.length > 0) {
                    let html = '<h1>Listado de Autos</h1>';
                    html += '<table>';
                    html += '<thead> <th>Patente</th> <th>marca</th> <th>Color</th> <th>precio</th>';
                    respuesta.forEach((elemento) => {
                        html += `<tr> <td>${elemento.patente}</td> <td>${elemento.marca}</td> <td>${elemento.color}</td> <td>${elemento.precio}</td> </tr>`;
                    });
                    html += '</table>';
                    $("#divTabla").html(html);
                }
                else {
                    // Manejar el caso en el que no se obtuvieron datos
                    $("#divTabla").html("<p>No se encontraron usuarios.</p>");
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        }
        static VerificarAutoJSON() {
            let patente = $("#patente").val();
            if (patente != "") {
                let patente = $("#patente").val();
                let form = new FormData();
                form.append("patente", patente);
                $.ajax({
                    type: "POST",
                    url: "./backend/verificarAutoJSON.php",
                    dataType: "text",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form
                })
                    .done((respuesta) => {
                    alert(respuesta);
                    console.log(respuesta);
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                    console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });
            }
        }
        static AgregarAutoSinFoto() {
            let patente = $("#patente").val();
            let marca = $("#marca").val();
            let color = $("#color").val();
            let precio = $("#precio").val();
            if (patente !== "" && marca !== "" && color !== "" && precio !== "") {
                let form = new FormData();
                form.append("auto_json", `{ "patente" : "${patente}", "marca" : "${marca}", "color": "${color}", "precio": ${precio} }`);
                $.ajax({
                    type: "POST",
                    url: "./backend/agregarAutoSinFoto.php",
                    dataType: "text",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form
                })
                    .done((respuesta) => {
                    alert(respuesta);
                    console.log(respuesta);
                    $("#btnMostrar").click();
                })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                    console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                });
            }
            else {
                alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
            }
        }
        static MostrarAutosBD() {
            $.ajax({
                type: "GET",
                url: "./backend/listadoAutosBD.php",
                dataType: "text",
            })
                .done((respuesta) => {
                // Limpiamos el contenido anterior del div
                $("#divTabla").html("");
                // Verificamos si la respuesta contiene datos
                if (respuesta.length > 0) {
                    console.log(respuesta);
                    let autos = JSON.parse(respuesta);
                    let html = '<h1>Listado de autos</h1>';
                    html += '<table>';
                    html += '<thead><th>Patente</th><th>Marca</th><th>Color</th><th>Precio</th><th>Foto</th></thead>';
                    autos.forEach((auto) => {
                        html += `<tr>
                                <td>${auto.patente}</td>
                                <td>${auto.marca}</td>
                                <td>${auto.color}</td>
                                <td>${auto.precio}</td>
                                <td><img src="./backend/autos/imagenes/${auto.pathFoto}" alt="auto" width="50px" height="50px"></td>
                                <td>
                                    <input type="button" value="modificar" data-obj=' ${JSON.stringify(auto)}' data-action="modificar">
                                    <input type="button" value="eliminar" data-obj='  ${JSON.stringify(auto)}' data-action="eliminar">
                                </td>
                                </tr>`;
                    });
                    html += '</table>';
                    $("#divTabla").html(html);
                    $('[data-action="modificar"]').on("click", function () {
                        let objString = $(this).attr("data-obj");
                        let obj = JSON.parse(objString);
                        console.log(obj);
                        $("#id").val(obj.id);
                        $("#nombre").val(obj.nombre);
                        $("#correo").val(obj.correo);
                        $("#clave").val(obj.clave);
                        $("#cboPerfiles").val(obj.id_perfil);
                    });
                    $('[data-action="eliminar"]').on("click", function () {
                        let objString = $(this).attr("data-obj");
                        console.log(objString);
                        let obj = JSON.parse(objString);
                        (new Manejadora()).EliminarAuto(obj);
                    });
                }
                else {
                    // Manejar el caso en el que no se obtuvieron datos
                    $("#divTabla").html("<p>No se encontraron usuarios.</p>");
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            });
        }
        EliminarAuto(obj) {
            let form = new FormData();
            form.append("auto_json", JSON.stringify(obj));
            $.ajax({
                type: "POST",
                url: "./backend/eliminarAutoBD.php",
                dataType: "text",
                cache: false,
                contentType: false,
                processData: false,
                data: form
            })
                .done((mensaje) => {
                alert(mensaje);
                $("#btnMostrar").click();
            });
        }
        ModificarAuto(obj) {
        }
    }
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map