"use strict";
var Entidades;
(function (Entidades) {
    class AutoBD extends Entidades.Auto {
        constructor(patente, marca, color, precio, pathFoto = "") {
            super(patente, marca, color, precio);
            this.pathFoto = pathFoto;
        }
        ToJSON() {
            return JSON.stringify(JSON.parse(this.ToString() + `, pathFoto: ${this.pathFoto}`));
        }
    }
    Entidades.AutoBD = AutoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=AutoBD.js.map