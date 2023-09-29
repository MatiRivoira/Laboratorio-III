/// <reference path="./persona.ts" />
/// <reference path="./alumno.ts" />

namespace Manejador {
    export function CrearAlumno() : void {
        let legajoInput = <HTMLInputElement>document.getElementById("txtLegajo");
        let nombre = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        let apellido = (<HTMLInputElement>document.getElementById("txtApellido")).value;
        let legajo = parseFloat(legajoInput.value);

        if (!isNaN(legajo)) {
            let alumno:Prueba.Alumno = new Prueba.Alumno(legajo, nombre, apellido);

            alert(`El alumno creado es: ${alumno.ToString()}`);
            console.log(`El alumno creado es: ${alumno.ToString()}`);
        } else {
            alert("El valor ingresado en Legajo no es un número válido");
            return;
        }
    }
}