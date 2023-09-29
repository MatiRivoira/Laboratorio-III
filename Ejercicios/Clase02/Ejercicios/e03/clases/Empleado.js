"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const Persona_1 = require("./Persona");
class Empleado extends Persona_1.Persona {
    constructor(nombre, apellido, dni, sexo, legajo, sueldo) {
        super(nombre, apellido, dni, sexo);
        this._legajo = legajo;
        this._sueldo = sueldo;
    }
    GetLegajo() {
        return this._legajo;
    }
    GetSueldo() {
        return this._sueldo;
    }
    Hablar(idioma) {
        return `El empleado habla ${idioma}`;
    }
    ToString() {
        return `${this._legajo}-${super.ToString()}-${this._sueldo}`;
    }
}
exports.Empleado = Empleado;
//# sourceMappingURL=Empleado.js.map