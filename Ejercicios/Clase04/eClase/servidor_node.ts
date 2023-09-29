import { isSet } from "util/types";

const express = require("express"); 
const app = express();
const fs = require("fs");
const path_archivo = "./archivos/productos.txt";

app.use(express.json());


app.set("puerto", 8008);
app.listen(app.get("puerto"), ()=>{
    console.log("servidor corriendo sobre puerto", app.get("puerto"));
});


app.get('/', (request:any, response:any)=>{
    response.send('GET - servidor NodeJS');
});

app.post('/', (request:any, response:any)=>{
    response.send('POST - servidor NodeJS');
});

app.put('/', (request:any, response:any)=>{
    response.send('PUT - servidor NodeJS');
});

app.delete('/', (request:any, response:any)=>{
    response.send('DELETE - servidor NodeJS');
});


app.get('/productos', (request:any, response:any)=>{
    fs.readFile(path_archivo, "UTF-8", (error:any, contenido:any)=>{
        if (error) {
            throw ("Error al leer archivo.");
        }
        let array = contenido.split(",\r\n");
        response.send(JSON.stringify(array));
    });

});

app.post('/productos', (request:any, response:any)=>{
    let dato = request.body;
    let contenido = JSON.stringify(dato);

    fs.appendFile(path_archivo, contenido + ",\r\n", (error:any)=>{
        if (error) {
            throw ("Error al intentar escribir el archivo.");
        }
        console.log("Archivo escrito correctamente.");
        response.send("Archivo escrito correctamente.");
    });
});

app.put('/productos', (request:any, response:any)=>{
    let obj = request.body;

    fs.readFile(path_archivo, "UTF-8", (error:any, contenido:any)=>{
        if (error) {
            throw ("Error al leer archivo;");
        }
        
        let array = contenido.split(",\r\n");
        let productosStr = "";

        array.forEach((item:any)=> {
            if (item != "" && item != undefined) {
                let itemObj = JSON.parse(item);
                if (itemObj.codigo == obj.codigo) {
                    itemObj.marca == obj.marca;
                    itemObj.precio == obj.precio;
                }
                productosStr += JSON.stringify(itemObj) + ",\r\n";
            }
        });
        

        fs.writeFile(path_archivo, productosStr, (error:any)=>{
            if (error) {
                throw("No se pudo escribir el archivo.");
            }
            console.log("Archivo escrito");
            response.send("Archivo escrito correctamente");
        });
    });
});

app.delete('/productos', (request:any, response:any)=>{
    response.send('DELETE - servidor NodeJS');
});
