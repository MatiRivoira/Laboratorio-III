/* Crear una función que realice el cálculo factorial del número que recibe como parámetro.  */


function Factorial(numero:number): number {
    if (numero === 0 || numero === 1) {
        return 1;
    } else {
        return numero * Factorial(numero - 1);
    }
}

console.log(Factorial(5));