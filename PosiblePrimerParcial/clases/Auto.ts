namespace Entidades {
    export class Auto {
        public patente:string;
        public marca:string;
        public color:string;
        public precio:number;

        constructor(patente:string, marca:string, color:string, precio:number) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }

        public ToString() : string {
            return `Nombre: ${this.patente}, Correo: ${this.marca}, Clave: ${this.color}, Precio: ${this.precio}`;
        }

        public ToJSON(): string {
            return JSON.stringify(JSON.parse(this.ToString()));
        }
    }
}
