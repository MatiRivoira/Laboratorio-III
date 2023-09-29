"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangulo = void 0;
const FiguraGeometrica_1 = require("./FiguraGeometrica");
class Triangulo extends FiguraGeometrica_1.FiguraGeometrica {
    constructor(color, base, altura) {
        super(color);
        this._altura = altura;
        this._base = base;
        this.CalcularDatos();
    }
    CalcularDatos() {
        this._superficie = (this._base * this._altura) / 2;
        this._perimetro = this._base + Math.sqrt(Math.pow(this._base, 2) + Math.pow(this._altura, 2)) + this._altura;
    }
    Dibujar() {
        let retorno = "";
        for (let i = 0; i < this._altura; i++) {
            for (let j = 0; j < this._base / 2 - i; j++) {
                retorno += " ";
            }
            retorno += "*";
            for (let k = 0; k < i * 2; k++) {
                retorno += "*";
            }
            retorno += "\n";
        }
        return retorno;
    }
    ToString() {
        return `Color: ${super.ToString()} | Altura: ${this._altura} | Base: ${this._base} | Superficie: ${this._superficie} | Perimetro: ${this._perimetro}`;
    }
}
exports.Triangulo = Triangulo;
//# sourceMappingURL=Triangulo.js.map