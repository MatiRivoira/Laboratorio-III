"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Triangulo_1 = require("./clases/Triangulo");
const Rectangulo_1 = require("./clases/Rectangulo");
var rectangulo = new Rectangulo_1.Rectangulo("black", 3, 6);
var trinagulo = new Triangulo_1.Triangulo("green", 5, 3);
console.log(rectangulo.Dibujar());
console.log(trinagulo.Dibujar());
console.log(rectangulo.ToString());
console.log(trinagulo.ToString());
//# sourceMappingURL=main.js.map