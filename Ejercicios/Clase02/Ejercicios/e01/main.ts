import { Rectangulo } from "./clases/Rectangulo";
import { Punto } from "./clases/Punto";

var punto1 = new Punto(0, 0);
var punto3 = new Punto(4, 3);
var rectangulo = new Rectangulo(punto1, punto3);

console.log(rectangulo.toString());
