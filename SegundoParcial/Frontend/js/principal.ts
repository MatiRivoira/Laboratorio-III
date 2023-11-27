/// <reference path="../node_modules/@types/jquery/index.d.ts" />

$(document).ready(function() {
    let jwt : any = localStorage.getItem('jwt');

    $.ajax({
        url: "http://localhost:2023/login",
        method: "GET",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done((obj_rta:any) => {
        if(obj_rta.exito){
            let app = obj_rta.payload.api;
            let version = obj_rta.payload.version;
            let usuario = obj_rta.payload.usuario;
            $("#nombre_usuario").html(usuario.Nombre);
        } else {
            alert(obj_rta.mensaje);
            setTimeout(() => {
                $(location).attr('href', URL_BASE + "login.html");
            }, 1500);
        }
    })
    .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {
        let retorno = JSON.parse(jqXHR.responseText);
        alert(retorno.mensaje);
    });
    
    
    //todo #############################################################################################################################################
    //todo # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO # LISTADO #
    //todo #############################################################################################################################################
    $("#listado_juguetes").on("click", function () {
        ListarJuguetesBD()
    });
    function ListarJuguetesBD() {
        let jwt : any = localStorage.getItem('jwt');
        $.ajax({
            url: "http://localhost:2023/listarJuguetesBD",
            method: "GET",
            dataType: "json",
            data: {},
            headers : {'Authorization': 'Bearer ' + jwt},
            async: true
        })
        .done((obj_rta:any) => {
            if (obj_rta.exito == undefined) {
                
                let tabla : string = '<table class="table transparent table-hover" style="color: white;">';
                tabla += '<tr> <th>ID</th> <th>MARCA</th> <th>PRECIO</th> <th>FOTO</th> <th style="width:110px">ACCIONES</th> </tr>';
                if(obj_rta.length == 0){
                    tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
                } else {
                    obj_rta.forEach((toy : any) => {
                        let old = "";
                        if (toy.path_foto.split('/').length < 2) {
                            old = "fotos/";
                        }
                        tabla +="<tr>"+
                                    "<td>"+toy.id+"</td>"+
                                    "<td>"+toy.marca+"</td>"+
                                    "<td>"+toy.precio+"</td>"+
                                    "<td><img src='"+URL_API+old+toy.path_foto+"' width='50px' height='50px'></td>"+
                                    "<td>"+
                                        "<a href='#' class='btn btnModificar' data-action='modificar' data-obj_prod='"+JSON.stringify(toy)+"' title='Modificar' data-toggle='modal' data-target='#ventana_modal_prod'>" + 
                                            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                            </svg>` +
                                        "</a>"+
                                        "<a href='#' class='btn btnEliminar' data-action='eliminar' data-obj_prod='"+JSON.stringify(toy)+"' title='Eliminar' data-toggle='modal' data-target='#ventana_modal_prod'>" + 
                                            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>` + 
                                        "</a>"+
                                    "</td>"+
                                "</tr>";
                    });
                }
                tabla += "</table>";
                $("#divTablaIzq").html(tabla);

                $("[data-action='modificar']").on("click", function(e){
                    e.preventDefault();
                    let objStr:any = $(this).attr("data-obj_prod");
                    let obj = JSON.parse(objStr);
                    let frm = MostrarForm("modificacion", obj);
                    $("#divTablaDer").html(frm);
                    Modificar();
                });

                $("[data-action='eliminar']").on("click", function(e){
                    e.preventDefault();
                    let objStr:any = $(this).attr("data-obj_prod");
                    let obj = JSON.parse(objStr);
                    let frm = MostrarForm("baja", obj);
                    $("#divTablaDer").html(frm);
                    Eliminar();
                });
            } else {
                alert(obj_rta.mensaje);
                setTimeout(() => {
                    $(location).attr('href', URL_BASE + "login.html");
                }, 1000);
            }
        })
        .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {
            let retorno = JSON.parse(jqXHR.responseText);
            alert(retorno.mensaje);
        });
    }

    //* ####################################################################################################################################################
    //* # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA # ALTA #
    //* ####################################################################################################################################################
    $("#alta_juguete").on("click", function() {
        let formulario : string = MostrarForm("alta");
        $("#divTablaDer").html(formulario);
        $("#btnAceptar").on("click", function(e:any) {
            e.preventDefault();
            let jwt = localStorage.getItem('jwt');
            let marca:any = $("#marca").val();
            let precio:any = $("#precio").val();
            let foto:any = $("#foto")[0];
        
            let frm = new FormData();
            frm.append("juguete_json", JSON.stringify({"marca": marca, "precio": precio}));
            frm.append("foto", foto.files[0]);
            
            $.ajax({
                type: 'POST',
                url: URL_API + "agregarJugueteBD",
                dataType: "json",
                data: frm,
                cache: false,
                processData: false,
                contentType: false,
                headers: {'Authorization': 'Bearer ' + jwt},
                async: true
            })
            .done(function (obj_ret:any) {
                ListarJuguetesBD();
                console.log(obj_ret);
                alert(obj_ret.mensaje);
            })
            .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {
                ListarJuguetesBD();
                console.log("fail");
                let retorno = JSON.parse(jqXHR.responseText);
                alert(retorno.mensaje);
            });
        });
    });

    //! ################################################################################################################################################
    //! # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR # ELIMINAR #
    //! ################################################################################################################################################
    function Eliminar() {
        $("#btnAceptar").on("click", function(e:any) {
            e.preventDefault();
            let id = $(this).data("id");
            let jwt = localStorage.getItem('jwt');
            
            let datos = {
                id_juguete: id
            };
            
            $.ajax({
                type: 'DELETE',
                url: URL_API + "toys",
                dataType: "application/x-www-form-urlencoded",
                data: datos,
                headers: {'Authorization': 'Bearer ' + jwt},
                async: true
            })
            .done(function (obj_ret:any) {
                ListarJuguetesBD();
                console.log(obj_ret);
                alert(obj_ret.mensaje);
            })
            .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {
                ListarJuguetesBD();
                let retorno = JSON.parse(jqXHR.responseText);
                console.log("fail");
                
                alert(retorno.mensaje);
            });
        });
    }

    //? #################################################################################################################################################
    //? # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR # MODIFICAR #
    //? #################################################################################################################################################
    function Modificar() {
        $("#btnAceptar").on("click", function(e:any) {
            e.preventDefault();
            let jwt = localStorage.getItem('jwt');
            let id = $(this).data("id");
            let marca:any = $("#marca").val();
            let precio:any = $("#precio").val();
            let foto:any = $("#foto")[0];
        
            let frm = new FormData();
            frm.append("juguete", JSON.stringify({"id_juguete": id, "marca": marca, "precio": precio}));
            frm.append("foto", foto.files[0]);
            
            $.ajax({
                type: 'POST',
                url: URL_API + "toys",
                dataType: "json",
                data: frm,
                cache: false,
                processData: false,
                contentType: false,
                headers: {'Authorization': 'Bearer ' + jwt},
                async: true
            })
            .done(function (obj_ret:any) {
                ListarJuguetesBD();
                console.log(obj_ret);
                alert(obj_ret.mensaje);
            })
            .fail( (jqXHR : any, textStatus : any, errorThrown : any) => {
                ListarJuguetesBD();
                let retorno = JSON.parse(jqXHR.responseText);
                alert(retorno.mensaje);
            });
        });
    }

    function MostrarForm(accion : string, obj_prod : any = null) : string {
        let encabezado : string = "";
        let solo_lectura : string = "";
        let solo_lectura_pk : string = "readonly";

        switch (accion) {
            case "alta":
                encabezado = 'AGREGAR PRODUCTO';
                solo_lectura_pk = "";
                break;

            case "baja":
                encabezado = 'ELIMINAR PRODUCTO';
                solo_lectura = "readonly";
                break;
        
            case "modificacion":
                encabezado = 'MODIFICAR PRODUCTO';
                break;
        }

        let id : any = "";
        let marca : string = "";
        let precio : string = "";
        let path : string = URL_BASE + "img/toy_default.jpeg";

        if (obj_prod !== null) 
        {
            id = obj_prod.id;
            marca = obj_prod.marca;
            precio = obj_prod.precio;
            path = URL_API + obj_prod.path_foto;     
            
            if (obj_prod.path_foto.split('/').length < 2) {
                path = `${URL_API}fotos/${obj_prod.path_foto}`;
            }
        }

        let form:string = '<h3 style="padding-top:1em; text-align: center;">'+encabezado+'</h3>\
                            <div class="row justify-content-center">\
                                <div class="col-md-8">\
                                    <form class="was-validated">\
                                        <div class="form-group">\
                                            <label for="codigo">Marca:</label>\
                                            <input type="text" class="form-control" id="marca" placeholder="Ingresar marca"\
                                                value="'+marca+'" '+solo_lectura+' required>\
                                        </div>\
                                        <div class="form-group">\
                                            <label for="precio">Precio:</label>\
                                            <input type="number" class="form-control" id="precio" placeholder="Ingresar precio" name="precio"\
                                                value="'+precio+'" '+solo_lectura+' required>\
                                            <div class="valid-feedback">OK.</div>\
                                            <div class="invalid-feedback">Valor requerido.</div>\
                                        </div>\
                                        <div class="form-group">\
                                            <label for="foto">Foto:</label>\
                                            <input type="file" class="form-control" id="foto" name="foto" '+solo_lectura+' required>\
                                            <div class="valid-feedback">OK.</div>\
                                            <div class="invalid-feedback">Valor requerido.</div>\
                                        </div>\
                                        <div class="row justify-content-between"><img id="img_prod" src="'+path+'" width="100%" height="400px"></div><br>\
                                        <div class="row justify-content-between">\
                                            <input id="btnCerrar" type="button" class="btn btn-danger" data-dismiss="modal" value="Cerrar">\
                                            <input id="btnLimpiar" type="button" class="btn btn-warning" data-dismiss="modal" value="Limpiar">\
                                            <button id="btnAceptar" data-id="' + id +'" type="submit" class="btn btn-primary" data-dismiss="modal">Aceptar</button>\
                                        </div>\
                                    </form>\
                                </div>\
                            </div>';
        return form;
    }

    $("#divTablaDer").on("click", "#btnLimpiar", function () {
        LimpiarFrm();
    });

    $("#divTablaDer").on("click", "#btnCerrar", function () {
        CerrarFrm();
    });

    function LimpiarFrm() {
        $("#marca").val("");
        $("#precio").val("");
        $("#foto").val("");
        $("#img_prod").attr("src", "img/toy_default.jpeg");
    }

    function CerrarFrm() {
        console.log("cerrado");
        $("#divTablaDer").html("<br><br>DERECHA");
    }
});