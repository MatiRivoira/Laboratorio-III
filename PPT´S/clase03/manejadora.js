"use strict";
var Test;
(function (Test) {
    //CREO UNA INSTANCIA DE XMLHTTPREQUEST
    let xhttp = new XMLHttpRequest();
    function Ajax() {
        //METODO; URL; ASINCRONICO?
        xhttp.open("GET", "BACKEND/ajax_test.php", true);
        //ENVIO DE LA PETICION
        xhttp.send();
        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            console.log(xhttp.readyState + " - " + xhttp.status);
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("divResultado").innerHTML = xhttp.responseText;
            }
        };
    }
    Test.Ajax = Ajax;
    //ENVIO PETICION CON PARAMETROS POR METODO GET
    function AjaxGET() {
        //METODO; URL + PARAMETROS; ASINCRONICO?
        xhttp.open("GET", "BACKEND/ajax_test.php?valor=" + Math.random() * 100, true);
        //ENVIO DE LA PETICION
        xhttp.send();
        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("divResultado").innerHTML = xhttp.responseText;
            }
        };
    }
    Test.AjaxGET = AjaxGET;
    //ENVIO PETICION CON PARAMETROS POR METODO POST
    function AjaxPOST() {
        //METODO; URL; ASINCRONICO?
        xhttp.open("POST", "BACKEND/ajax_test.php", true);
        //INSTANCIO OBJETO FORMDATA
        let form = new FormData();
        //AGREGO PARAMETROS AL FORMDATA:
        form.append('valor', (Math.random() * 100).toString());
        //ENVIO DE LA PETICION CON LOS PARAMETROS FORMDATA
        xhttp.send(form);
        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("divResultado").innerHTML = xhttp.responseText;
            }
        };
    }
    Test.AjaxPOST = AjaxPOST;
    function ActualizarGET() {
        //METODO; URL + PARAMETROS; ASINCRONICO?
        xhttp.open("GET", "BACKEND/ajax_test.php?valor=" + Math.random() * 100, true);
        //ENVIO DE LA PETICION
        xhttp.send();
        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            AdministrarRespuesta();
        };
    }
    Test.ActualizarGET = ActualizarGET;
    function ActualizarPOST() {
        //METODO; URL; ASINCRONICO?
        xhttp.open("POST", "BACKEND/ajax_test.php", true);
        //SETEO EL ENCABEZADO DE LA PETICION	
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //ENVIO DE LA PETICION CON LOS PARAMETROS
        xhttp.send("valor=" + Math.random() * 100);
        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            AdministrarRespuesta();
        };
    }
    Test.ActualizarPOST = ActualizarPOST;
    function AdministrarRespuesta() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //LA RESPUESTA SE GUARDA EN UN ELEMENTO HTML
            document.getElementById("divResultado").innerHTML = xhttp.responseText;
        }
    }
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    function ProcesoLargo() {
        let pagina = "BACKEND/proceso_largo.php";
        let div = document.getElementById("divResultado");
        //LIMPIO EL CONTENIDO DEL DIV    
        div.innerHTML = "";
        //MUESTRO EL GIF EN EL CENTRO DE LA PAGINA
        AdministrarGif(true, 1);
        //METODO; URL; ASINCRONICO?
        xhttp.open("POST", pagina, true);
        //SETEO EL ENCABEZADO DE LA PETICION	
        xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //ENVIO DE LA PETICION
        xhttp.send(null);
        //FUNCION CALLBACK
        xhttp.onreadystatechange = () => {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhttp.readyState === DONE) {
                if (xhttp.status === OK) {
                    //MUESTRO EL RESULTADO DE LA PETICION
                    div.innerHTML = xhttp.responseText;
                    //OCULTO EL GIF
                    AdministrarGif(false);
                }
                else {
                    console.error("Error\n" + xhttp.status);
                    //OCULTO EL GIF
                    AdministrarGif(false);
                }
            }
        };
    }
    Test.ProcesoLargo = ProcesoLargo;
    function AdministrarGif(mostrar, cual = 1) {
        var gif = cual === 1 ? "AJAX/Iphone-spinner-2.gif" : "AJAX/Billiard-ball.gif";
        let div = document.getElementById("divGif");
        let img = document.getElementById("imgGif");
        if (mostrar) {
            div.style.display = "block";
            div.style.top = "45%";
            div.style.left = "45%";
            img.src = gif;
        }
        else {
            div.style.display = "none";
            img.src = "";
        }
    }
    function IrHacia(pagina) {
        window.location.href = pagina;
    }
    Test.IrHacia = IrHacia;
})(Test || (Test = {}));
//# sourceMappingURL=manejadora.js.map