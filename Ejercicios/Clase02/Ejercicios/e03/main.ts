import { Empleado } from "./clases/Empleado";

let empleado:Empleado = new Empleado("Matias", "Rivoira", 45065345, "M", 101, 10);

console.log(empleado.Hablar("Español"));
console.log(empleado.ToString());