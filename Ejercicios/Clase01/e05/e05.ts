/* Guardar su nombre y apellido en dos variables distintas. Dichas variables serán pasadas
como parámetro de la función MostrarNombreApellido, que mostrará el apellido en
mayúscula y el nombre solo con la primera letra en mayúsculas y el resto en minúsculas.
El apellido y el nombre se mostrarán separados por una coma (,).  */

var nombre:string = "matias";
var apellido:string = "rivoira";

MostrarNombreApellido(nombre, apellido);

function MostrarNombreApellido(nombre:string, apellido:string) {
    console.log(`${nombre.toUpperCase()} ${apellido[0].toUpperCase()}${apellido.slice(1).toLowerCase()}`);
}