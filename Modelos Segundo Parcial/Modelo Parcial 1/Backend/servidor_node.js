"use strict";
const express = require('express');
const app = express();
app.set('puerto', 2023); //! Puerto #####################################################################################
const fs = require('fs');
app.use(express.json());
const jwt = require("jsonwebtoken");
app.set("key_jwt", "Rivoira.Matias"); //! Clave secreta #################################################################
app.use(express.urlencoded({ extended: false }));
const multer = require('multer');
const mime = require('mime-types');
const storage = multer.diskStorage({
    destination: "public/fotos/" //! Directorio de fotos #################################################################
});
const upload = multer({
    storage: storage
});
const cors = require("cors");
app.use(cors());
app.use(express.static("public"));
const mysql = require('mysql');
const myconn = require('express-myconnection');
const db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'jugueteria_bd' //! Database ##############################################################################
};
app.use(myconn(mysql, db_options, 'single'));
//? #####################################################################################################################
//? Validaciones y login
//? #####################################################################################################################
//* Validar usuario en la base de datos
const verificar_usuario = express.Router();
verificar_usuario.use((request, response, next) => {
    let obj = request.body;
    console.log(obj);
    request.getConnection((err, conn) => {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("select * from usuarios where correo = ? and clave = ? ", [obj.correo, obj.clave], (err, rows) => {
            if (err)
                throw ("Error en consulta de base de datos.");
            if (rows.length == 1) {
                response.obj_usuario = rows[0];
                next();
            }
            else {
                response.status(200).json({
                    exito: false,
                    mensaje: "Correo y/o Clave incorrectos.",
                    jwt: null
                });
            }
        });
    });
});
//* login POST
app.post("/login", verificar_usuario, (request, response, obj) => {
    const user = response.obj_usuario;
    const payload = {
        usuario: {
            Id: user.id,
            Correo: user.correo,
            Clave: user.clave,
            Nombre: user.nombre,
            Apellido: user.apellido,
            Foto: user.foto,
            Perfil: user.perfil
        },
        alumno: {
            Nombre: "Matias",
            Apellido: "Rivoira",
        },
        dni_alumno: {
            Dni: "45065345"
        },
        api: "productos_usuarios API",
        version: "1.0.1"
    };
    const token = jwt.sign(payload, app.get("key_jwt"), {
        expiresIn: "9999m"
    });
    response.json({
        exito: true,
        status: 200,
        mensaje: "JWT creado!!!",
        jwt: token
    });
});
//* Verificar jwt valido
const verificar_jwt = express.Router();
verificar_jwt.use((request, response, next) => {
    //SE RECUPERA EL TOKEN DEL ENCABEZADO DE LA PETICIÓN
    let token = request.headers["authorization"];
    if (!token) {
        response.status(401).send({
            error: "El JWT es requerido!!!"
        });
        return;
    }
    //SE RECUPERA EL JWT DEL AUTH BEARER TOKEN
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }
    if (token) {
        //SE VERIFICA EL TOKEN CON LA CLAVE SECRETA
        jwt.verify(token, app.get("key_jwt"), (error, decoded) => {
            if (error) {
                return response.json({
                    exito: false,
                    status: 403,
                    mensaje: "El JWT NO es válido!!!"
                });
            }
            else {
                response.jwt = decoded;
                next();
            }
        });
    }
    else {
        response.status(401).send({
            error: "El JWT está vacío!!!"
        });
    }
});
//* LOGIN GET
app.get("/login", verificar_jwt, (request, response, obj) => {
    const jwtInfo = response.jwt;
    response.json({
        exito: true,
        status: 200,
        mensaje: "JWT creado!!!",
        payload: jwtInfo,
    });
});
//? ######################################################################################################################
//? Crud BD
//? ######################################################################################################################
//* Agregar
app.post('/agregarJugueteBD', verificar_jwt, upload.single("foto"), (request, response) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.juguete_json);
    let path = file.destination + obj.marca + "." + extension;
    fs.renameSync(file.path, path);
    obj.path_foto = path.split("public/")[1];
    request.getConnection((err, conn) => {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("insert into juguetes set ?", [obj], (err, rows) => {
            if (err) {
                console.log(err);
                throw ("Error en consulta de base de datos.");
            }
            response.json({
                exito: true,
                mensaje: "Juguete agregado a la bd.",
            });
        });
    });
});
//* Listar
app.get('/listarJuguetesBD', verificar_jwt, (request, response) => {
    request.getConnection((err, conn) => {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("select * from juguetes", (err, rows) => {
            if (err)
                throw ("Error en consulta de base de datos.");
            response.send(JSON.stringify(rows));
        });
    });
});
//* Eliminar
app.delete('/toys', (request, response) => {
    let obj = request.body;
    let path_foto = "public/";
    let hay_registro = false;
    request.getConnection((err, conn) => {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        //obtengo el path de la foto del producto a ser eliminado
        conn.query("select path_foto from juguetes where id = ?", [obj.id_juguete], (err, result) => {
            if (err)
                throw ("Error en consulta de base de datos.");
            if (result.length > 0) {
                path_foto += result[0].path_foto;
                hay_registro = true;
            }
            if (hay_registro) {
                request.getConnection((err, conn) => {
                    if (err)
                        throw ("Error al conectarse a la base de datos.");
                    conn.query("delete from juguetes where id = ?", [obj.id_juguete], (err, rows) => {
                        if (err) {
                            console.log(err);
                            throw ("Error en consulta de base de datos.");
                        }
                        borrarFoto(path_foto);
                        response.json({
                            exito: true,
                            mensaje: "Juguete eliminado de la bd.",
                        });
                    });
                });
            }
            else {
                response.json({
                    exito: false,
                    mensaje: "Juguete NO eliminado de la bd.",
                });
            }
        });
    });
});
function borrarFoto(path_foto) {
    let borrado = true;
    fs.unlink(path_foto, (err) => {
        if (err) {
            console.log(err);
            borrado = false;
        }
        else {
            console.log(path_foto + ' fue borrado.');
        }
    });
    return borrado;
}
//* Modificar
app.post('/toys', upload.single("foto"), (request, response) => {
    let file = request.file;
    let extension = mime.extension(file.mimetype);
    let obj = JSON.parse(request.body.juguete);
    let path = file.destination + obj.marca + "." + extension;
    fs.renameSync(file.path, path);
    obj.path = path.split("public/")[1];
    let obj_modif = {};
    //para excluir la pk (codigo)
    obj_modif.marca = obj.marca;
    obj_modif.precio = obj.precio;
    obj_modif.path_foto = obj.path;
    request.getConnection((err, conn) => {
        if (err)
            throw ("Error al conectarse a la base de datos.");
        conn.query("update juguetes set ? where id = ?", [obj_modif, obj.id_juguete], (err, rows) => {
            if (err) {
                console.log(err);
                throw ("Error en consulta de base de datos.");
            }
            let hay_registro = rows.affectedRows == 0 ? false : true;
            if (!hay_registro) {
                borrarFoto("public/" + obj.path);
            }
            response.json({
                exito: hay_registro,
                mensaje: hay_registro ? "Producto modificado en la bd." : "Producto NO modificado en la bd.",
            });
        });
    });
});
//! Agregar al final para que funcione el servidor node
app.listen(app.get('puerto'), () => {
    console.log('Servidor corriendo sobre puerto:', app.get('puerto'));
});
//# sourceMappingURL=servidor_node.js.map