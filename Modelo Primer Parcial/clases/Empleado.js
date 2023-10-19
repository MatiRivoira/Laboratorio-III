"use strict";
/// <reference path="./Persona.ts" />
/// <reference path="./Usuario.ts" />
var Entidades;
(function (Entidades) {
    class Empleado extends Entidades.Usuario {
        constructor(nombre, correo, id, id_perfil, perfil, sueldo, foto) {
            super(nombre, correo, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Empleado.js.map