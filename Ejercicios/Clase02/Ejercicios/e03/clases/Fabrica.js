"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fabrica = void 0;
class Fabrica {
    constructor(razonSocial) {
        this._empleados = Array();
        this._razonSocial = razonSocial;
    }
    AgregarEmpleado(empleado) {
        if (!this._empleados.includes(empleado)) {
            this._empleados.push(empleado);
            return true;
        }
        return false;
    }
    CalcularSueldos() {
        let sumaSueldo = 0;
        this._empleados.forEach(empleado => {
            sumaSueldo += empleado.GetSueldo();
        });
        return sumaSueldo / this._empleados.length;
    }
    EliminarEmpleado(empleado) {
        if (this._empleados.includes(empleado)) {
            this._empleados.splice(this._empleados.indexOf(empleado), 1);
            return true;
        }
        return false;
    }
    ToString() {
        let retorno = `Razon social: ${this._razonSocial} \n Empleados en la fabrica:`;
        this._empleados.forEach(empleado => {
            retorno += `${empleado.ToString()} \n`;
        });
        return retorno;
    }
}
exports.Fabrica = Fabrica;
//# sourceMappingURL=Fabrica.js.map