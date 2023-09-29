"use strict";
/// <reference path="../ajax.ts" />
function ObtenerEquiposPorIdPais(idPais) {
    if (idPais == 0) {
        return;
    }
    let pagina = "../BACKEND/paises_equipos.php";
    let params = "idPais=" + idPais.toString();
    let ajax = new Ajax();
    document.getElementById("cboEquipo").innerHTML = "";
    ajax.Post(pagina, (resultado) => {
        let equiposArray = JSON.parse(resultado);
        for (let i = 0; i < equiposArray.length; i++) {
            let elemento = {};
            elemento.value = equiposArray[i].id;
            elemento.innerHTML = equiposArray[i].nombre;
            let opcion = "<option value='" + elemento.value + "'>" + elemento.innerHTML + "</option>";
            document.getElementById("cboEquipo").innerHTML += opcion;
        }
    }, params, Fail);
}
function Fail(retorno) {
    console.clear();
    console.error(retorno);
}
//# sourceMappingURL=ejemplo.js.map