"use strict";
/// <reference path="./persona.ts" />
/// <reference path="./alumno.ts" />
var Manejador;
(function (Manejador) {
    function CrearAlumno() {
        let legajoInput = document.getElementById("txtLegajo");
        let nombre = document.getElementById("txtNombre").value;
        let apellido = document.getElementById("txtApellido").value;
        let legajo = parseFloat(legajoInput.value);
        if (!isNaN(legajo)) {
            let alumno = new Prueba.Alumno(legajo, nombre, apellido);
            alert(`El alumno creado es: ${alumno.ToString()}`);
            console.log(`El alumno creado es: ${alumno.ToString()}`);
        }
        else {
            alert("El valor ingresado en Legajo no es un número válido");
            return;
        }
    }
    Manejador.CrearAlumno = CrearAlumno;
})(Manejador || (Manejador = {}));
//# sourceMappingURL=manejador.js.map