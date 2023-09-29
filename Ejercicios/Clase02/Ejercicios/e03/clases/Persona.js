"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
class Persona {
    constructor(nombre, apellido, dni, sexo) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._sexo = sexo;
    }
    GetApellido() {
        return this._apellido;
    }
    GetDni() {
        return this._dni;
    }
    GetNombre() {
        return this._nombre;
    }
    GetSexo() {
        return this._sexo;
    }
    ToString() {
        return `${this._nombre}-${this._apellido}-${this._dni}-${this._sexo}`;
    }
}
exports.Persona = Persona;
//# sourceMappingURL=Persona.js.map