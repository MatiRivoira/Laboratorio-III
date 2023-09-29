"use strict";
/// <reference path="./clases/persona.ts" />
/// <reference path="./clases/persona.ts" />
var TestPrueba;
(function (TestPrueba) {
    let alumnos = [];
    // Crear cuatro alumnos
    const alumno1 = new Prueba.Alumno(101, "Gómez", "Juan");
    const alumno2 = new Prueba.Alumno(102, "López", "María");
    const alumno3 = new Prueba.Alumno(103, "Martínez", "Carlos");
    const alumno4 = new Prueba.Alumno(103, "Pérez", "Ana");
    // Agregar los alumnos a la colección
    alumnos.push(alumno1);
    alumnos.push(alumno2);
    alumnos.push(alumno3);
    alumnos.push(alumno4);
    // Mostrar los alumnos por consola
    alumnos.forEach((alumno) => {
        console.log(alumno.ToString());
    });
})(TestPrueba || (TestPrueba = {}));
//# sourceMappingURL=main.js.map