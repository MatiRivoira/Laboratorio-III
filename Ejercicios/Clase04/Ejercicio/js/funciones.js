"use strict";
var Funciones;
(function (Funciones) {
    //CREO UNA INSTANCIA DE XMLHTTPREQUEST
    let xhttp = new XMLHttpRequest();
    function AjaxPostJSON(accion) {
        let xhttp = new XMLHttpRequest();
        let legajo = document.getElementById('legajo').value;
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let fotoInput = document.getElementById('foto');
        if (fotoInput && fotoInput.files && fotoInput.files.length > 0) {
            let foto = fotoInput.files[0];
            let form = new FormData();
            // Agregar parámetros al FormData
            form.append('accion', `${accion}`);
            form.append('legajo', legajo);
            form.append('nombre', nombre);
            form.append('apellido', apellido);
            form.append('foto', foto);
            xhttp.open("POST", "./backend/nexo_poo.php");
            xhttp.send(form);
            // Función de callback
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (accion == "listar_objetos") {
                        document.getElementById("listadoAlumnos").textContent = xhttp.responseText;
                    }
                    else if (accion == "listar_tabla") {
                        let tablaContainer = document.getElementById("tablaContainer");
                        if (tablaContainer) {
                            tablaContainer.innerHTML = xhttp.responseText;
                        }
                    }
                    else {
                        alert(xhttp.responseText);
                    }
                }
            };
        }
        else {
            alert("Por favor, selecciona una foto.");
        }
    }
    Funciones.AjaxPostJSON = AjaxPostJSON;
})(Funciones || (Funciones = {}));
//# sourceMappingURL=funciones.js.map