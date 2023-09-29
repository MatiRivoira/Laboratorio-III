"use strict";
/// <reference path="./persona.ts" />
var Prueba;
(function (Prueba) {
    class Alumno extends Prueba.Persona {
        constructor(legajo, nombre, apellido) {
            super(nombre, apellido);
            this.legajo = legajo;
        }
        getLegajo() {
            return this.legajo;
        }
        setLegajo(v) {
            this.legajo = v;
        }
        ToString() {
            return this.legajo + ", " + super.ToString();
        }
    }
    Prueba.Alumno = Alumno;
})(Prueba || (Prueba = {}));
//# sourceMappingURL=alumno.js.map