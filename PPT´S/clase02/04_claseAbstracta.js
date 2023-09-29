"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = exports.Vehiculo = void 0;
class Vehiculo {
    constructor(marca) {
        this.marca = marca;
    }
    Mostrar() {
        return this.marca;
    }
}
exports.Vehiculo = Vehiculo;
class Auto extends Vehiculo {
    GetPrecio() {
        return this.precio;
    }
    constructor(color, precio, marca) {
        super(marca);
        this.precio = precio;
        this.color = color;
    }
    //DE LA CLASE ABSTRACTA
    Acelerar() {
        console.log("Acelerando...");
    }
    //DE LA CLASE ABSTRACTA
    get Marca() {
        return this.marca;
    }
    //DE LA CLASE ABSTRACTA
    set Marca(value) {
        this.marca = value;
    }
    //POLIMORFISMO
    Mostrar() {
        return super.Mostrar() + this.precio + this.color;
    }
}
exports.Auto = Auto;
//# sourceMappingURL=04_claseAbstracta.js.map