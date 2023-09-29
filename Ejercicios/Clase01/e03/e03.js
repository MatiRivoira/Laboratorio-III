"use strict";
/* Realizar una función que reciba un parámetro requerido de tipo numérico y otro opcional
de tipo cadena. Si el segundo parámetro es recibido, se mostrará tantas veces por
consola, como lo indique el primer parámetro. En caso de no recibir el segundo
parámetro, se mostrará el valor inverso del primer parámetro. */
Test(2, ".");
function Test(numero, str) {
    if (str) {
        for (let i = 0; i < numero; i++) {
            console.log(str);
        }
    }
    else {
        console.log(-numero);
    }
}
//# sourceMappingURL=e03.js.map