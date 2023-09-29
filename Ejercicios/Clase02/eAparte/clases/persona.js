"use strict";
var Prueba;
(function (Prueba) {
    class Persona {
        constructor(nombre, apellido) {
            this.apellido = apellido;
            this.nombre = nombre;
        }
        getNombre() {
            return this.nombre;
        }
        setNombre(v) {
            this.nombre = v;
        }
        getApellido() {
            return this.apellido;
        }
        setApellido(v) {
            this.apellido = v;
        }
        ToString() {
            return `${this.nombre}, ${this.apellido}`;
        }
    }
    Prueba.Persona = Persona;
})(Prueba || (Prueba = {}));
//# sourceMappingURL=persona.js.map