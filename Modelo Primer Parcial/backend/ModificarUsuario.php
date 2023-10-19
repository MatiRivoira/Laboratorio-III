<?php
include_once "./clases/Usuario.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonRecibido = file_get_contents("php://input");
    $data = json_decode($jsonRecibido, true);
    if ((new Usuario($data["id"], $data["nombre"], $data["correo"], $data["clave"], $data["id_perfil"], "Modificar"))->Modificar()) {
        echo json_encode(array("exito" => true, "mensaje" => "El Usuario se modifico correctamente"));
    } else {
        echo json_encode(array("exito" => true, "mensaje" => "El Usuario no se modifico correctamente"));
    }
}