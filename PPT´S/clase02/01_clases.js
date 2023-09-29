"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auto = void 0;
class Auto {
    //GETTERS
    GetColor() {
        return this.color;
    }
    //SETTERS
    SetColor(color) {
        this.color = color;
    }
    //ACCESOR GET
    get Precio() {
        return this.precio;
    }
    //ACCESOR SET
    set Precio(value) {
        this.precio = value;
    }
    constructor(color, precio) {
        this.precio = precio;
        this.color = color;
    }
    static MetodoEstatico() {
        console.log("Método esático");
    }
}
exports.Auto = Auto;
//NOTAS:
//1) LOS ACCESORES REQUIEREN QUE SE ESTABLEZCA EL COMPILADOR PARA SALIDA A ECMAScript 5 O SUPERIOR. 
//2) LOS ACCESORES SOLO CON GET SE INFIEREN AUTOMATICAMENTE COMO READONLY. 
//3) LOS ACCESORES SET, NO PUEDEN LLEVAR TIPO DE RETORNO
//# sourceMappingURL=01_clases.js.map