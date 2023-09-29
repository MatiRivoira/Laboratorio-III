namespace Prueba {
    export class Persona {
        protected apellido:string;
        protected nombre:string;

        constructor(nombre:string, apellido:string) {
            this.apellido = apellido;
            this.nombre = nombre;
        }

        public getNombre() : string {
            return this.nombre;
        }
        public setNombre(v : string) {
            this.nombre = v;
        }
        
        public getApellido() : string {
            return this.apellido;
        }
        public setApellido(v : string) {
            this.apellido = v;
        }
        
        public ToString() : string {
            return `${this.nombre}, ${this.apellido}`;
        }
    }
}