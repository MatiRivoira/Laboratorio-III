"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiguraGeometrica = void 0;
class FiguraGeometrica {
    constructor(color) {
        this._color = color;
        this._perimetro = 0;
        this._superficie = 0;
        this.CalcularDatos();
    }
    GetColor() {
        return this._color;
    }
    ToString() {
        return this._color;
    }
}
exports.FiguraGeometrica = FiguraGeometrica;
//# sourceMappingURL=FiguraGeometrica.js.map