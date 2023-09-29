"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
class Auto {
    get Precio() {
        return this.precio;
    }
    constructor(color, precio) {
        this.precio = precio;
        this.color = color;
        this.patente = "sin patente";
    }
    //DE LA INTERFACE
    GetColor() {
        return this.color;
    }
    //DE LA INTERFACE
    SetColor(color) {
        this.color = color;
    }
}
exports.Auto = Auto;
//NOTAS:
//1) LAS INTERFACES SE PUEDEN HEREDAR
//2) LAS INTERFACES PUEDEN CONTENER ATRIBUTOS Y METODOS
//# sourceMappingURL=03_interfaces.js.map