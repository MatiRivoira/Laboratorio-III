"use strict";
/// <reference path="./Persona.ts" />
var Entidades;
(function (Entidades) {
    class Usuario extends Entidades.Persona {
        constructor(nombre, correo, id, id_perfil, perfil) {
            super(nombre, correo);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        ToJSON() {
            let personaJSON = JSON.parse(super.ToString());
            return JSON.stringify({ personaJSON, id: this.id, id_perfil: this.id_perfil, perfil: this.perfil });
        }
    }
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Usuario.js.map