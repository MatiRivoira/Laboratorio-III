"use strict";
/* Definir una función que determine si la cadena de texto que se le pasa como parámetro
es un palíndromo, es decir, si se lee de la misma forma desde la izquierda y desde la
derecha. Ejemplo de palíndromo complejo: "La ruta nos aporto otro paso natural".  */
function EsPalindromo(cadena) {
    if (eliminarEspacios(cadena.toLowerCase()) === eliminarEspacios(InvertirCadena(cadena).toLowerCase())) {
        return true;
    }
    return false;
}
function InvertirCadena(cadena) {
    let resultado = "";
    for (let i = cadena.length - 1; i >= 0; i--) {
        resultado += cadena.charAt(i);
    }
    return resultado;
}
function eliminarEspacios(cadena) {
    return cadena.replace(/\s+/g, '');
}
var cadena = "La ruta nos aporto otro paso natural";
if (EsPalindromo(cadena)) {
    console.log(`"${cadena}" es palindromo. \nSu reverso es: ${InvertirCadena(cadena)}`);
}
else {
    console.log(`${cadena} no es palindromo \nSu reverso es: ${InvertirCadena(cadena)}`);
}
//# sourceMappingURL=e11.js.map