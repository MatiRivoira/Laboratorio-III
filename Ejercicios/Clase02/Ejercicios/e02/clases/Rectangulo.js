"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangulo = void 0;
const FiguraGeometrica_1 = require("./FiguraGeometrica");
class Rectangulo extends FiguraGeometrica_1.FiguraGeometrica {
    constructor(color, l1, l2) {
        super(color);
        this._ladoUno = l1;
        this._ladoDos = l2;
    }
    CalcularDatos() {
        this._superficie = this._ladoUno * this._ladoDos;
        this._perimetro = 2 * (this._ladoUno + this._ladoDos);
    }
    Dibujar() {
        let retorno = "";
        for (let j = 0; j < this._ladoUno; j++) {
            for (let i = 0; i < this._ladoDos; i++) {
                retorno += "*";
            }
            retorno += "\n";
        }
        return retorno;
    }
    ToString() {
        return `Color: ${super.ToString()} | Lado 1: ${this._ladoUno} | Lado 2: ${this._ladoDos}`;
    }
}
exports.Rectangulo = Rectangulo;
//# sourceMappingURL=Rectangulo.js.map