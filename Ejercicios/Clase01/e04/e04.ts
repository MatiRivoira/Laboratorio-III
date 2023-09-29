/* Realizar una función que reciba un número y que muestre (por consola) un mensaje
como el siguiente:
El número 5 es impar, siendo 5 el número recibido como parámetro.  */

EsImpar(5);

function EsImpar(numero:number) {
    if (numero % 2 != 0) {
        console.log(`El número ${numero} es impar`);
    } else {
        console.log(`El número ${numero} es par`);
    }
}