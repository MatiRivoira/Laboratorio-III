var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Prueba;
(function (Prueba) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido) {
            this.apellido = apellido;
            this.nombre = nombre;
        }
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.setNombre = function (v) {
            this.nombre = v;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        Persona.prototype.setApellido = function (v) {
            this.apellido = v;
        };
        Persona.prototype.ToString = function () {
            return "".concat(this.nombre, ", ").concat(this.apellido);
        };
        return Persona;
    }());
    Prueba.Persona = Persona;
})(Prueba || (Prueba = {}));
/// <reference path="./persona.ts" />
var Prueba;
(function (Prueba) {
    var Alumno = /** @class */ (function (_super) {
        __extends(Alumno, _super);
        function Alumno(legajo, nombre, apellido) {
            var _this = _super.call(this, nombre, apellido) || this;
            _this.legajo = legajo;
            return _this;
        }
        Alumno.prototype.getLegajo = function () {
            return this.legajo;
        };
        Alumno.prototype.setLegajo = function (v) {
            this.legajo = v;
        };
        Alumno.prototype.ToString = function () {
            return this.legajo + ", " + _super.prototype.ToString.call(this);
        };
        return Alumno;
    }(Prueba.Persona));
    Prueba.Alumno = Alumno;
})(Prueba || (Prueba = {}));
/// <reference path="./clases/persona.ts" />
/// <reference path="./clases/persona.ts" />
var TestPrueba;
(function (TestPrueba) {
    var alumnos = [];
    // Crear cuatro alumnos
    var alumno1 = new Prueba.Alumno(101, "Gómez", "Juan");
    var alumno2 = new Prueba.Alumno(102, "López", "María");
    var alumno3 = new Prueba.Alumno(103, "Martínez", "Carlos");
    var alumno4 = new Prueba.Alumno(103, "Pérez", "Ana");
    // Agregar los alumnos a la colección
    alumnos.push(alumno1);
    alumnos.push(alumno2);
    alumnos.push(alumno3);
    alumnos.push(alumno4);
    // Mostrar los alumnos por consola
    alumnos.forEach(function (alumno) {
        console.log(alumno.ToString());
    });
})(TestPrueba || (TestPrueba = {}));
