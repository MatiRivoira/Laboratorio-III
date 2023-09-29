"use strict";
/// <reference path="./01_vehiculo.ts" />
var Test;
(function (Test) {
    class Auto extends Test.Vehiculo {
        GetPrecio() {
            return this.precio;
        }
        constructor(color, precio, marca) {
            super(marca);
            this.precio = precio;
            this.color = color;
        }
        Mostrar() {
            return super.Mostrar() + this.precio + this.color;
        }
        Acelerar() {
            console.log("Acelerando...");
        }
    }
    Test.Auto = Auto;
})(Test || (Test = {}));
//# sourceMappingURL=02_auto.js.map