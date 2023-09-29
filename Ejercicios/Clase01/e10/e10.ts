/*  Definir una función que muestre información sobre una cadena de texto que se le pasa
como argumento. A partir de la cadena que se le pasa, la función determina si esa cadena
está formada sólo por mayúsculas, sólo por minúsculas o por una mezcla de ambas. */


function LowerOrUpper(str:string):string {
    if (str === str.toLowerCase()) {
        return `La cadena "${str}" esta formada completamente por minusculas`;
    } else if (str === str.toUpperCase()) {
        return `La cadena "${str}" esta formada completamente por mayusculas`;
    } else {
        return `La cadena "${str}" esta formada mixtamente entre minusculas y mayusculas`;
    }
}

console.log(LowerOrUpper("AsD"));
