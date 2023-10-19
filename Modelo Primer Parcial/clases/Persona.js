"use strict";
var Entidades;
(function (Entidades) {
    class Persona {
        constructor(nombre, correo) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = "";
        }
        ToString() {
            return `Nombre: ${this.nombre}, Correo: ${this.correo}, Clave: ${this.clave}`;
        }
    }
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Persona.js.map