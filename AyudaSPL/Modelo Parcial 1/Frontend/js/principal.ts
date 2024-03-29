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
                let tabla : string = '<table class="table table-dark table-hover">';
                tabla += '<tr> <th>ID</th> <th>MARCA</th> <th>PRECIO</th> <th>FOTO</th> <th style="width:110px">ACCIONES</th> </tr>';
                if(obj_rta.length == 0){
                    tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
                } else {
                    obj_rta.forEach((toy : any) => {
                        tabla +="<tr>"+
                                    "<td>"+toy.id+"</td>"+
                                    "<td>"+toy.marca+"</td>"+
                                    "<td>"+toy.precio+"</td>"+
                                    "<td><img src='"+URL_API+toy.path_foto+"' width='50px' height='50px'></td>"+
                                    "<td>"+
                                        "<a href='#' class='btn btnModificar' data-action='modificar' data-obj_prod='"+JSON.stringify(toy)+"' title='Modificar' data-toggle='modal' data-target='#ventana_modal_prod'><span class='btnModificar'></span></a>"+
                                        "<a href='#' class='btn btnEliminar' data-action='eliminar' data-obj_prod='"+JSON.stringify(toy)+"' title='Eliminar' data-toggle='modal' data-target='#ventana_modal_prod'><span class='btnEliimnar'></span></a>"+
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
        let path : string = URL_BASE + "/img/producto_default.png";

        if (obj_prod !== null) 
        {
            id = obj_prod.id;
            marca = obj_prod.marca;
            precio = obj_prod.precio;
            path = URL_API + obj_prod.path_foto;       
        }

        let form:string = '<h3 style="padding-top:1em;">'+encabezado+'</h3>\
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
                                        <div class="row justify-content-between"><img id="img_prod" src="'+path+'" width="400px" height="200px"></div><br>\
                                        <div class="row justify-content-between">\
                                            <input type="button" class="btn btn-danger" data-dismiss="modal" value="Cerrar">\
                                            <button id="btnAceptar" data-id="' + id +'" type="submit" class="btn btn-primary" data-dismiss="modal">Aceptar</button>\
                                        </div>\
                                    </form>\
                                </div>\
                            </div>';
        return form;
    }
});