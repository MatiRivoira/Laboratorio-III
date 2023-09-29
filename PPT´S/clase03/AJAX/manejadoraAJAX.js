"use strict";
var TestAjax;
(function (TestAjax) {
    function Suggestion(cadena) {
        if (cadena.length == 0) {
            document.getElementById("divNombresSugeridos").innerHTML = "";
            return;
        }
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let sugerencias = xmlhttp.responseText;
                sugerencias = sugerencias === "" ? "Sin Sugerencias..." : sugerencias;
                document.getElementById("divNombresSugeridos").innerHTML = sugerencias;
            }
        };
        xmlhttp.open("POST", "../BACKEND/obtenerSugerencia.php", true);
        xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("palabra=" + cadena);
    }
    TestAjax.Suggestion = Suggestion;
})(TestAjax || (TestAjax = {}));
//# sourceMappingURL=manejadoraAJAX.js.map