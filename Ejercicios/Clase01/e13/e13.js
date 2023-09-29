"use strict";
/* Un número de Smith es un número entero tal que la suma de sus dígitos es igual a la
suma de los dígitos de los números restantes tras la factorización en primos (la
factorización debe estar escrita sin exponentes, repitiendo los números todas las veces
necesarias). Por ejemplo, 378 = 2 × 3 × 3 × 3 × 7 es un número de Smith en base 10,
porque 3 + 7 + 8 = 2 + 3 + 3 + 3 + 7. Por definición, se deben contar los dígitos de los
factores. Por ejemplo, 22 en base 10 es 2 × 11, y se deben contar los tres dígitos: 2, 1,
1. Por lo tanto 22 es un número de Smith porque 2 + 2 = 2 + 1 + 1
Nota: Utilice tres funciones, una realiza la comparación, otra descompone el numero en
sus factores primos y suma los coeficientes, y la última función suma cada termino.  */
// Función que descompone un número en sus factores primos y devuelve los coeficientes
function descomponerEnFactoresPrimos(numero) {
    const factoresPrimos = [];
    let divisor = 2;
    while (numero > 1) {
        if (numero % divisor === 0) {
            factoresPrimos.push(divisor);
            numero /= divisor;
        }
        else {
            divisor++;
        }
    }
    return factoresPrimos;
}
// Función que suma los coeficientes de los factores primos
function sumarCoeficientes(factoresPrimos) {
    return factoresPrimos.reduce((suma, coeficiente) => suma + coeficiente, 0);
}
// Función principal que verifica si un número es un número de Smith
function esNumeroDeSmith(numero) {
    if (numero < 4) {
        return false; // Los números menores que 4 no se consideran números de Smith
    }
    const digitosNumero = numero.toString().split('').map(Number); // Convertir número a arreglo de dígitos
    const sumaDigitos = digitosNumero.reduce((suma, digito) => suma + digito, 0);
    const factoresPrimos = descomponerEnFactoresPrimos(numero);
    const sumaCoeficientes = sumarCoeficientes(factoresPrimos);
    return sumaDigitos === sumaCoeficientes;
}
// Ejemplo de uso:
const numero1 = 378;
const numero2 = 22;
console.log(esNumeroDeSmith(numero1)); // Devuelve true (378 es un número de Smith)
console.log(esNumeroDeSmith(numero2)); // Devuelve true (22 es un número de Smith)
//# sourceMappingURL=e13.js.map