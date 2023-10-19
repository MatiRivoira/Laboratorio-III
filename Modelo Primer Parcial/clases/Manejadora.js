"use strict";
/// <reference path="./node_modules/@types/jquery/index.d.ts">
var ModeloParcial;
(function (ModeloParcial) {
    function AgregarUsuarioJSON() {
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        if (nombre !== "" && correo !== "" && clave !== "") {
            let form = new FormData();
            form.append("nombre", nombre);
            form.append("correo", correo);
            form.append("clave", clave);
            $.ajax({
                type: "POST",
                url: "./backend/AltaUsuarioJSON.php",
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
    ModeloParcial.AgregarUsuarioJSON = AgregarUsuarioJSON;
    function MostrarUsuariosJSON() {
        $.ajax({
            type: "GET",
            url: "./backend/ListadoUsuariosJSON.php",
            dataType: "json",
        })
            .done((respuesta) => {
            // Limpiamos el contenido anterior del div
            $("#divTabla").html("");
            // Verificamos si la respuesta contiene datos
            if (respuesta.length > 0) {
                let html = '<h1>Listado de Usuarios</h1>';
                html += '<table>';
                html += '<thead> <th>Id</th> <th>Nombre</th> <th>Correo</th> <th>Id_perfil</th> <th>Perfil</th> </thead>';
                respuesta.forEach((elemento) => {
                    html += `<tr> <td>${elemento.id}</td> <td>${elemento.nombre}</td> <td>${elemento.correo}</td> <td>${elemento.id_perfil}</td> <td>${elemento.perfil}</td> </tr>`;
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
    ModeloParcial.MostrarUsuariosJSON = MostrarUsuariosJSON;
    function VerificarUsuarioJSON() {
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        if (correo !== "" && clave !== "") {
            let correo = $("#correo").val();
            let clave = $("#clave").val();
            if (correo !== "" && clave !== "") {
                let datoObjeto = `{ "correo" : "${correo}", "clave" : "${clave}"}`;
                $.ajax({
                    type: "POST",
                    url: "./backend/VerificarUsuarioJSON.php",
                    dataType: "text",
                    data: datoObjeto,
                    contentType: "application/json",
                    async: true
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
        else {
            alert("Porfavor, Ingrese todos los valores para poder verificar el usuario");
        }
    }
    ModeloParcial.VerificarUsuarioJSON = VerificarUsuarioJSON;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// CRUD CON BASE DE DATOS ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function AgregarUsuario() {
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        let perfil = $("#cboPerfiles").val();
        if (nombre !== "" && correo !== "" && clave !== "" && perfil !== "") {
            let form = new FormData();
            form.append("nombre", nombre);
            form.append("correo", correo);
            form.append("clave", clave);
            form.append("id_perfil", perfil);
            $.ajax({
                type: "POST",
                url: "./backend/AltaUsuario.php",
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
    ModeloParcial.AgregarUsuario = AgregarUsuario;
    function MostrarUsuarios() {
        $.ajax({
            type: "GET",
            url: "./backend/ListadoUsuarios.php",
            dataType: "text",
        })
            .done((respuesta) => {
            // Limpiamos el contenido anterior del div
            $("#divTabla").html("");
            // Verificamos si la respuesta contiene datos
            if (respuesta.length > 0) {
                $("#divTabla").html(respuesta);
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
                    let obj = JSON.parse(objString);
                    let form = new FormData();
                    form.append("id", obj.id);
                    $.ajax({
                        type: "POST",
                        url: "./backend/EliminarUsuario.php",
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
    ModeloParcial.MostrarUsuarios = MostrarUsuarios;
    function ModificarUsuario() {
        let id = $("#id").val();
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        let perfil = $("#cboPerfiles").val();
        if (nombre !== "" && correo !== "" && clave !== "" && perfil !== "") {
            let empleado = `{"id": ${id}, "nombre": "${nombre}", "correo" : "${correo}", "clave" : "${clave}", "id_perfil": "${perfil}"}`;
            $.ajax({
                type: "POST",
                url: "./backend/ModificarUsuario.php",
                dataType: "json",
                data: empleado,
                contentType: "application/json",
                async: true
            })
                .done((respuesta) => {
                alert(JSON.stringify(respuesta));
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
    ModeloParcial.ModificarUsuario = ModificarUsuario;
    function VerificarUsuario() {
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        if (correo !== "" && clave !== "") {
            let correo = $("#correo").val();
            let clave = $("#clave").val();
            if (correo !== "" && clave !== "") {
                let datoObjeto = `{ "correo" : "${correo}", "clave" : "${clave}"}`;
                $.ajax({
                    type: "POST",
                    url: "./backend/VerificarUsuarioJSON.php",
                    dataType: "text",
                    data: datoObjeto,
                    contentType: "application/json",
                    async: true
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
        else {
            alert("Porfavor, Ingrese todos los valores para poder verificar el usuario");
        }
    }
    ModeloParcial.VerificarUsuario = VerificarUsuario;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// CRUD CON FOTO ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function AgregarEmpleado() {
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        let perfil = $("#cboPerfiles").val();
        let sueldo = $("#sueldo").val();
        let foto = $("#foto"); // Obtener el archivo de imagen seleccionado
        if (nombre !== "" && correo !== "" && clave !== "" && perfil !== "" && foto[0].files.length > 0) {
            let form = new FormData();
            form.append("nombre", nombre);
            form.append("correo", correo);
            form.append("clave", clave);
            form.append("id_perfil", perfil);
            form.append("sueldo", sueldo);
            form.append("foto", foto[0].files[0]);
            $.ajax({
                type: "POST",
                url: "./backend/AltaEmpleado.php",
                dataType: "json",
                contentType: false,
                processData: false,
                data: form
            })
                .done((respuesta) => {
                alert(JSON.stringify(respuesta));
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
    ModeloParcial.AgregarEmpleado = AgregarEmpleado;
    function MostrarEmpleados() {
        $.ajax({
            type: "GET",
            url: "./backend/ListadoEmpleados.php",
            dataType: "text",
        })
            .done((respuesta) => {
            // Limpiamos el contenido anterior del div
            $("#divTablaEmpleados").html("");
            // Verificamos si la respuesta contiene datos
            if (respuesta.length > 0) {
                $("#divTablaEmpleados").html(respuesta);
                $('[data-action="modificar"]').on("click", function () {
                    let objString = $(this).attr("data-obj");
                    let obj = JSON.parse(objString);
                    console.log(obj);
                    $("#id").val(obj.id);
                    $("#nombre").val(obj.nombre);
                    $("#correo").val(obj.correo);
                    $("#clave").val(obj.clave);
                    $("#cboPerfiles").val(obj.id_perfil);
                    $("#sueldo").val(obj.sueldo);
                    $("#imgFoto").attr("src", "./backend/" + (obj.foto["tmp_name"]).substring(1));
                });
                $('[data-action="eliminar"]').on("click", function () {
                    let objString = $(this).attr("data-obj");
                    let obj = JSON.parse(objString);
                    if (confirm(`¿Estás seguro de que deseas eliminar a ${obj.nombre} con sueldo de ${obj.sueldo}?`)) {
                        let form = new FormData();
                        form.append("id", obj.id);
                        $.ajax({
                            type: "POST",
                            url: "./backend/EliminarEmpleado.php",
                            dataType: "JSON",
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: form
                        })
                            .done((mensaje) => {
                            alert(JSON.stringify(mensaje));
                            $("#btnMostrar").click();
                        })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                        });
                    }
                });
            }
            else {
                // Manejar el caso en el que no se obtuvieron datos
                $("#divTablaEmpleados").html("<p>No se encontraron usuarios.</p>");
            }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });
    }
    ModeloParcial.MostrarEmpleados = MostrarEmpleados;
    function ModificarEmpleado() {
        var _a;
        let id = $("#id").val();
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let clave = $("#clave").val();
        let perfil = $("#cboPerfiles").val();
        let sueldo = $("#sueldo").val();
        let foto = $("#foto");
        if (nombre !== "" && correo !== "" && clave !== "" && perfil !== "" && sueldo != null) {
            let empleado = {
                id: id,
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: perfil,
                sueldo: sueldo,
                pathFoto: (_a = ($("#imgFoto").attr("src"))) === null || _a === void 0 ? void 0 : _a.substring(9)
            };
            let formData = new FormData();
            formData.append("empleado_json", JSON.stringify(empleado));
            formData.append("foto", foto[0].files[0]);
            $.ajax({
                type: "POST",
                url: "./backend/ModificarEmpleado.php",
                dataType: "json",
                data: formData,
                contentType: false,
                processData: false,
                async: true
            })
                .done((respuesta) => {
                alert(JSON.stringify(respuesta));
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
    ModeloParcial.ModificarEmpleado = ModificarEmpleado;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map