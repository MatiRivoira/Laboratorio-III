/* Crear una función que reciba como único parámetro una cadena que contenga el día, mes
y año de nacimiento de una persona (con formato dd-mm-yyyy). La función mostrará por
consola a que signo corresponde dicha fecha de nacimiento.
Nota: Para descomponer la fecha recibida como parámetro utilice la función split.  */


function ConocerSigno(fechaNacimiento:string):string {
    let partes:string[] = fechaNacimiento.split('-');
    if (partes.length !== 3) {
      return "Formato de fecha incorrecto. Debe ser dd-mm-yyyy.";
    }

    let dia:number = parseInt(partes[0]);
    let mes:number = parseInt(partes[1]);

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
        return "Aries";
      } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
        return "Tauro";
      } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
        return "Géminis";
      } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
        return "Cáncer";
      } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        return "Leo";
      } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        return "Virgo";
      } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        return "Libra";
      } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        return "Escorpio";
      } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
        return "Sagitario";
      } else {
        return "Capricornio";
      }
}

var fechaNacimiento = "10-05-1990";
console.log(`El signo correspondiente a la fecha ${fechaNacimiento} es: ${ConocerSigno(fechaNacimiento)}`);
