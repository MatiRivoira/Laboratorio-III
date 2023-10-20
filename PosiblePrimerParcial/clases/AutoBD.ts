namespace Entidades {
    export class AutoBD extends Auto {
        public pathFoto:string;

        constructor(patente:string, marca:string, color:string, precio:number, pathFoto:string = "") {
            super(patente, marca, color, precio);
            this.pathFoto = pathFoto;
        }

        public ToJSON(): string {
            return JSON.stringify(JSON.parse(this.ToString() + `, pathFoto: ${this.pathFoto}`));
        }
    }
}