/// <reference path="Auto.ts" />

namespace Entidades {
    export class AutoBD extends Auto {
        public pathFoto:string;

        constructor(patente:string, marca:string, color:string, precio:number, pathFoto:string = "") {
            super(patente, marca, color, precio);
            this.pathFoto = pathFoto;
        }

        ToJSON(){
            let autoString = super.ToString();
            let autoJson = autoString + `, "pathFoto": "${this.pathFoto}"`;
            return "{" + autoJson + "}"; 
        }
    }
}