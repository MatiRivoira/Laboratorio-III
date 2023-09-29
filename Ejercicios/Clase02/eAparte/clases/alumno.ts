/// <reference path="./persona.ts" />

namespace Prueba 
{
    export class Alumno extends Persona 
    {
        protected legajo:number;

        constructor(legajo:number, nombre:string, apellido:string) {
            super(nombre, apellido);
            this.legajo = legajo;
        }

        public getLegajo() : number {
            return this.legajo;
        }
        public setLegajo(v : number) {
            this.legajo = v;
        }
        
        public ToString(): string {
            return this.legajo + ", " + super.ToString();
        }
    }
}