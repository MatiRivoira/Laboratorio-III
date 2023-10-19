/// <reference path="./Persona.ts" />

namespace Entidades {
    export class Usuario extends Persona{
        public id:number;
        public id_perfil:number;
        public perfil:string;

        constructor(nombre:string, correo:string, id:number, id_perfil:number, perfil:string) {
            super(nombre, correo);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }

        public ToJSON(): string {
            let personaJSON = JSON.parse(super.ToString());
            return JSON.stringify({ personaJSON, id: this.id, id_perfil: this.id_perfil, perfil: this.perfil });
        }
    }
}