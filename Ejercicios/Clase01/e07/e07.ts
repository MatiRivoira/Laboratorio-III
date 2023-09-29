/*  Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una
función. */

var totalPrimos:number = 0;
var limite:number = 20;

for (let i = 0; totalPrimos < limite; i++) {
    if (esPrimo(i)) {
        console.log(i);
        totalPrimos++;
    }
}

function esPrimo(numero:number) {
    for (let i = 2; i < numero; i++) {
        if (numero % i == 0) {
            return false;
        }
    }
    return true;
}

  