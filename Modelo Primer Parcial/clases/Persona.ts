namespace Entidades {
    export class Persona {
        public nombre:string;
        public correo:string;
        public clave:string;

        constructor(nombre:string, correo:string) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = "";
        }

        public ToString() : string {
            return `Nombre: ${this.nombre}, Correo: ${this.correo}, Clave: ${this.clave}`;
        }
    }
}