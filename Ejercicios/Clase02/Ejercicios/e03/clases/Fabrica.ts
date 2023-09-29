import { Empleado } from "./Empleado";

export class Fabrica {
    private _empleados:Array<Empleado>;
    private _razonSocial:string;

    constructor(razonSocial:string) {
        this._empleados = Array<Empleado>();
        this._razonSocial = razonSocial;    
    }

    public AgregarEmpleado(empleado:Empleado):boolean{
        if (!this._empleados.includes(empleado)) {
            this._empleados.push(empleado);
            return true;
        }
        return false;
    }

    public CalcularSueldos():number {
        let sumaSueldo = 0;
        this._empleados.forEach(empleado => {
            sumaSueldo += empleado.GetSueldo(); 
        });
        return sumaSueldo / this._empleados.length;
    }

    public EliminarEmpleado(empleado:Empleado):boolean{
        if (this._empleados.includes(empleado)) {
            this._empleados.splice(this._empleados.indexOf(empleado), 1);
            return true;
        }
        return false;
    }

    public ToString():string{
        let retorno = `Razon social: ${this._razonSocial} \n Empleados en la fabrica:`;
        this._empleados.forEach(empleado => {
            retorno += `${empleado.ToString()} \n`;
        });
        return retorno;
    }
}