"use strict";
var Entidades;
(function (Entidades) {
    class Auto {
        constructor(patente, marca, color, precio) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }
        ToString() {
            return `Nombre: ${this.patente}, Correo: ${this.marca}, Clave: ${this.color}, Precio: ${this.precio}`;
        }
        ToJSON() {
            return JSON.stringify(JSON.parse(this.ToString()));
        }
    }
    Entidades.Auto = Auto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Auto.js.map