/// <reference path="./node_modules/@types/jquery/index.d.ts">

namespace ModeloParcial {
    export function AgregarUsuarioJSON() {
        let nombre : any = $("#nombre").val();
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();

        if(nombre !== "" && correo !== "" && clave !== ""){
            let form:FormData = new FormData();
            form.append("nombre", nombre);
            form.append("correo", correo);
            form.append("clave", clave);

            $.ajax({
                type:"POST",
                url: "./backend/AltaUsuarioJSON.php",
                dataType: "text",
                cache: false,
                contentType: false, //cuando se envia por frmdata
                processData: false, //cuando se envia por frmdata
                data: form
            })
            .done((respuesta)=>{
                alert(respuesta);
                console.log(respuesta);
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            }); 
        } else {
            alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
        }
    }

    export function MostrarUsuariosJSON() {
        $.ajax({
            type: "GET",
            url: "./backend/ListadoUsuariosJSON.php",
            dataType: "json",
        })
        .done((respuesta: any) => {
            // Limpiamos el contenido anterior del div
            $("#divTabla").html("");
    
            // Verificamos si la respuesta contiene datos
            if (respuesta.length > 0) {
                let html = '<h1>Listado de Usuarios</h1>';
                html += '<table>';
                html += '<thead> <th>Id</th> <th>Nombre</th> <th>Correo</th> <th>Id_perfil</th> <th>Perfil</th> </thead>';
                
                respuesta.forEach((elemento: any) => {
                    html += `<tr> <td>${elemento.id}</td> <td>${elemento.nombre}</td> <td>${elemento.correo}</td> <td>${elemento.id_perfil}</td> <td>${elemento.perfil}</td> </tr>`;
                });
    
                html += '</table>';
                $("#divTabla").html(html);
            } else {
                // Manejar el caso en el que no se obtuvieron datos
                $("#divTabla").html("<p>No se encontraron usuarios.</p>");
            }
        })
        .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });
    }
    
    export function VerificarUsuarioJSON() {
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();

        
        if(correo !== "" && clave !== ""){
            let correo = $("#correo").val();
            let clave = $("#clave").val();

            if (correo !== "" && clave !== "") {
                let datoObjeto = `{ "correo" : "${correo}", "clave" : "${clave}"}`;
            
                $.ajax({
                    type:"POST",
                    url: "./backend/VerificarUsuarioJSON.php",
                    dataType: "text",
                    data: datoObjeto,
                    contentType:"application/json",
                    async: true
                })
                .done((respuesta)=>{
                    alert(respuesta);
                    console.log(respuesta);
                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                    console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                }); 
            }
        } else {
            alert("Porfavor, Ingrese todos los valores para poder verificar el usuario");
        }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// CRUD CON BASE DE DATOS ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    export function AgregarUsuario() {
        let nombre : any = $("#nombre").val();
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();
        let perfil : any= $("#cboPerfiles").val();
        if(nombre !== "" && correo !== "" && clave !== "" && perfil !== ""){
            let form:FormData = new FormData();
            form.append("nombre", nombre);
            form.append("correo", correo);
            form.append("clave", clave);
            form.append("id_perfil", perfil);

            $.ajax({
                type:"POST",
                url: "./backend/AltaUsuario.php",
                dataType: "text",
                cache: false,
                contentType: false, //cuando se envia por frmdata
                processData: false, //cuando se envia por frmdata
                data: form
            })
            .done((respuesta)=>{
                alert(respuesta);
                console.log(respuesta);
                $("#btnMostrar").click();
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            }); 
        } else {
            alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
        }
    }

    export function MostrarUsuarios() {
        $.ajax({
            type: "GET",
            url: "./backend/ListadoUsuarios.php",
            dataType: "text",
        })
        .done((respuesta: any) => {
            // Limpiamos el contenido anterior del div
            $("#divTabla").html("");
    
            // Verificamos si la respuesta contiene datos
            if (respuesta.length > 0) {
                $("#divTabla").html(respuesta);

                $('[data-action="modificar"]').on("click", function(){
                    let objString:any = $(this).attr("data-obj");
                    let obj = JSON.parse(objString);
                    console.log(obj);

                    $("#id").val(obj.id);
                    $("#nombre").val(obj.nombre);
                    $("#correo").val(obj.correo);
                    $("#clave").val(obj.clave);
                    $("#cboPerfiles").val(obj.id_perfil);

                });
        
                $('[data-action="eliminar"]').on("click", function(){
                    let objString:any = $(this).attr("data-obj");
                    let obj = JSON.parse(objString);
                    
                    let form:FormData = new FormData();
                    form.append("id", obj.id);

                    $.ajax({
                        type:"POST",
                        url: "./backend/EliminarUsuario.php",
                        dataType: "text",
                        cache: false,
                        contentType: false, //cuando se envia por frmdata
                        processData: false, //cuando se envia por frmdata
                        data: form
                    })
                    .done((mensaje:any)=>{
                        alert(mensaje);
                        $("#btnMostrar").click();
                    });
                });
            } else {
                // Manejar el caso en el que no se obtuvieron datos
                $("#divTabla").html("<p>No se encontraron usuarios.</p>");
            }
        })
        .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });
    }

    export function ModificarUsuario() {
        let id : any = $("#id").val();
        let nombre : any = $("#nombre").val();
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();
        let perfil : any= $("#cboPerfiles").val();
        if(nombre !== "" && correo !== "" && clave !== "" && perfil !== ""){
            let empleado = `{"id": ${id}, "nombre": "${nombre}", "correo" : "${correo}", "clave" : "${clave}", "id_perfil": "${perfil}"}`;

            $.ajax({
                type:"POST",
                url: "./backend/ModificarUsuario.php",
                dataType: "json",
                data: empleado,
                contentType:"application/json",
                async: true
            })
            .done((respuesta)=>{
                alert(JSON.stringify(respuesta));
                console.log(respuesta);
                $("#btnMostrar").click();
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            }); 
        } else {
            alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
        }
    }

    export function VerificarUsuario() {
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();
        
        if(correo !== "" && clave !== ""){
            let correo = $("#correo").val();
            let clave = $("#clave").val();

            if (correo !== "" && clave !== "") {
                let datoObjeto = `{ "correo" : "${correo}", "clave" : "${clave}"}`;
            
                $.ajax({
                    type:"POST",
                    url: "./backend/VerificarUsuarioJSON.php",
                    dataType: "text",
                    data: datoObjeto,
                    contentType:"application/json",
                    async: true
                })
                .done((respuesta)=>{
                    alert(respuesta);
                    console.log(respuesta);
                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                    alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                    console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                }); 
            }
        } else {
            alert("Porfavor, Ingrese todos los valores para poder verificar el usuario");
        }
    }
    

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /// CRUD CON FOTO ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    export function AgregarEmpleado() {
        let nombre : any = $("#nombre").val();
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();
        let perfil : any= $("#cboPerfiles").val();
        let sueldo : any= $("#sueldo").val();
        let foto : any = $("#foto"); // Obtener el archivo de imagen seleccionado
        if(nombre !== "" && correo !== "" && clave !== "" && perfil !== "" && foto[0].files.length > 0){
            let form:FormData = new FormData();
            form.append("nombre", nombre);
            form.append("correo", correo);
            form.append("clave", clave);
            form.append("id_perfil", perfil);
            form.append("sueldo", sueldo);
            form.append("foto", foto[0].files[0]);

            $.ajax({
                type:"POST",
                url: "./backend/AltaEmpleado.php",
                dataType: "json",
                contentType: false, //cuando se envia por frmdata
                processData: false, //cuando se envia por frmdata
                data: form
            })
            .done((respuesta)=>{
                alert(JSON.stringify(respuesta));
                console.log(respuesta);
                $("#btnMostrar").click();
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            }); 
        } else {
            alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
        }
    }

    export function MostrarEmpleados() {
        $.ajax({
            type: "GET",
            url: "./backend/ListadoEmpleados.php",
            dataType: "text",
        })
        .done((respuesta: any) => {
            // Limpiamos el contenido anterior del div
            $("#divTablaEmpleados").html("");
    
            // Verificamos si la respuesta contiene datos
            if (respuesta.length > 0) {
                $("#divTablaEmpleados").html(respuesta);

                $('[data-action="modificar"]').on("click", function(){
                    let objString:any = $(this).attr("data-obj");
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
        
                $('[data-action="eliminar"]').on("click", function(){
                    let objString:any = $(this).attr("data-obj");
                    let obj = JSON.parse(objString);
            
                    if (confirm(`¿Estás seguro de que deseas eliminar a ${obj.nombre} con sueldo de ${obj.sueldo}?`)) {
                        let form:FormData = new FormData();
                        form.append("id", obj.id);
    
                        $.ajax({
                            type:"POST",
                            url: "./backend/EliminarEmpleado.php",
                            dataType: "JSON",
                            cache: false,
                            contentType: false, //cuando se envia por frmdata
                            processData: false, //cuando se envia por frmdata
                            data: form
                        })
                        .done((mensaje:any)=>{
                            alert(JSON.stringify(mensaje));
                            $("#btnMostrar").click();
                        })
                        .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
                            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                        });
                    }
             
                });
            } else {
                // Manejar el caso en el que no se obtuvieron datos
                $("#divTablaEmpleados").html("<p>No se encontraron usuarios.</p>");
            }
        })
        .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
            alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
        });
    }

    export function ModificarEmpleado() {
        let id : any = $("#id").val();
        let nombre : any = $("#nombre").val();
        let correo: any = $("#correo").val();
        let clave : any= $("#clave").val();
        let perfil : any= $("#cboPerfiles").val();
        let sueldo : any= $("#sueldo").val();
        let foto : any = $("#foto");
        if(nombre !== "" && correo !== "" && clave !== "" && perfil !== "" && sueldo != null){
            let empleado = {
                id: id,
                nombre: nombre,
                correo: correo,
                clave: clave,
                id_perfil: perfil,
                sueldo: sueldo,
                pathFoto: ($("#imgFoto").attr("src"))?.substring(9)
            };
            let formData = new FormData();
            formData.append("empleado_json", JSON.stringify(empleado));
            formData.append("foto", foto[0].files[0]);

            $.ajax({
                type: "POST",
                url: "./backend/ModificarEmpleado.php",
                dataType: "json",
                data: formData,
                contentType: false, // Establecer contentType a false para que jQuery configure automáticamente
                processData: false, // Establecer processData a false para que jQuery no procese el objeto FormData
                async: true
            })
            .done((respuesta)=>{
                alert(JSON.stringify(respuesta));
                console.log(respuesta);
                $("#btnMostrar").click();
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {
                alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
                console.log(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
            }); 
        } else {
            alert("Porfavor, Ingrese todos los valores para poder agregar el usuario");
        }
    }
}