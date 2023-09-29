import { Triangulo } from "./clases/Triangulo";
import { Rectangulo } from "./clases/Rectangulo";

var rectangulo:Rectangulo = new Rectangulo("black", 3, 6);
var trinagulo:Triangulo = new Triangulo("green", 5, 3);

console.log(rectangulo.Dibujar());
console.log(trinagulo.Dibujar());

console.log(rectangulo.ToString());
console.log(trinagulo.ToString());
