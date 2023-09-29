"use strict";
/*  Se necesita mostrar por consola los primeros 20 números primos. Para ello realizar una
función. */
var totalPrimos = 0;
var limite = 20;
for (let i = 0; totalPrimos < limite; i++) {
    if (esPrimo(i)) {
        console.log(i);
        totalPrimos++;
    }
}
function esPrimo(numero) {
    for (let i = 2; i < numero; i++) {
        if (numero % i == 0) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=e07.js.map