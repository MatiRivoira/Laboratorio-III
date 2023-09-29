"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Rectangulo_1 = require("./clases/Rectangulo");
const Punto_1 = require("./clases/Punto");
var punto1 = new Punto_1.Punto(0, 0);
var punto3 = new Punto_1.Punto(4, 3);
var rectangulo = new Rectangulo_1.Rectangulo(punto1, punto3);
console.log(rectangulo.toString());
//# sourceMappingURL=main.js.map