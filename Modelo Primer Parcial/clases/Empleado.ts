/// <reference path="./Persona.ts" />
/// <reference path="./Usuario.ts" />
namespace Entidades {
    export class Empleado extends Usuario {
        public sueldo:number;
        public foto:string;

        constructor(nombre: string, correo: string, id: number, id_perfil: number, perfil: string, sueldo: number, foto: string) {
            super(nombre, correo, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }

}