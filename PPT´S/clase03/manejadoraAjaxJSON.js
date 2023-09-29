"use strict";
/// <reference path="./ajax.ts" />
var testJsonAjax;
(function (testJsonAjax) {
    function EnviarJSON() {
        //CREO UN OBJETO JSON
        let persona = { "nombre": "Juan", "edad": 35 };
        let pagina = "../BACKEND/json_test_enviar.php";
        let ajax = new Ajax();
        let params = "miPersona=" + JSON.stringify(persona);
        ajax.Post(pagina, (resultado) => {
            document.getElementById("divResultado").innerHTML = resultado;
            console.clear();
            console.log(resultado);
        }, params, Fail);
    }
    testJsonAjax.EnviarJSON = EnviarJSON;
    function RecibirJSON() {
        let pagina = "../BACKEND/json_test_recibir.php";
        let ajax = new Ajax();
        ajax.Post(pagina, (resultado) => {
            document.getElementById("divResultado").innerHTML = "";
            console.clear();
            console.log(resultado);
            let objJson = JSON.parse(resultado);
            let cadena = objJson.nombre + " - " + objJson.edad;
            console.log(cadena);
            document.getElementById("divResultado").innerHTML = cadena;
        }, "", Fail);
    }
    testJsonAjax.RecibirJSON = RecibirJSON;
    function Fail(retorno) {
        console.clear();
        console.error("ERROR!!!");
        console.log(retorno);
    }
})(testJsonAjax || (testJsonAjax = {}));
//# sourceMappingURL=manejadoraAjaxJSON.js.map