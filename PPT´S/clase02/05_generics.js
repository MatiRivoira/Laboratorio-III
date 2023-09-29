"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _02_herencia_1 = require("./02_herencia"); //IMPORTO AUTO
//FUNCION GENERICA
function Generica(param) {
    console.log("El tipo es: " + typeof (param));
    return param;
}
//PASO EL TIPO DE FORMA EXPLICITA
let retStrring = Generica("hola");
console.log(retStrring);
//EL TIPO SE INFIERE
retStrring = Generica("mundo");
console.log(retStrring);
console.log("---------------------------");
let autito = new _02_herencia_1.Auto("ROJO", 125000, "FERRARI");
//PASO EL TIPO DE FORMA EXPLICITA
let retAuto = Generica(autito);
console.log(retAuto.Mostrar());
//EL TIPO SE INFIERE
retAuto = Generica(new _02_herencia_1.Auto("AMARILLO", 200000, "SEAT"));
console.log(retAuto.Mostrar());
console.log("---------------------------");
//CLASE GENERICA
class ClaseGenerica {
    constructor(uno, dos) {
        this.paramUno = uno;
        this.paramDos = dos;
    }
    Mostrar() {
        console.log(this.paramUno + " - " + this.paramDos);
    }
}
//PASO EL TIPO DE FORMA EXPLICITA
let obj = new ClaseGenerica("cadena", 10);
//EL TIPO SE INFIERE
let obj2 = new ClaseGenerica(true, "otra cadena");
obj.Mostrar();
obj2.Mostrar();
console.log("---------------------------");
//# sourceMappingURL=05_generics.js.map