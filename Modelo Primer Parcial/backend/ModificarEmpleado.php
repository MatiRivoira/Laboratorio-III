<?php
include_once "./clases/Empleado.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonRecibido = $_POST["empleado_json"];
    $data = json_decode($jsonRecibido, true);
    
     // Comprobar si se han enviado archivos
     if (!empty($_FILES["foto"]["name"])) {
        $foto = $_FILES["foto"];
    } else {
        $foto = Empleado::ConstruirFoto($data["pathFoto"]);
    }
    
    if ((new Empleado($data["id"], $data["nombre"], $data["correo"], $data["clave"], $data["id_perfil"], "Modificar", $foto, $data["sueldo"]))->Modificar()) {
        echo json_encode(array("exito" => true, "mensaje" => "El Empleado se modifico correctamente"));
    } else {
        echo json_encode(array("exito" => true, "mensaje" => "El Empleado no se modifico correctamente"));
    }
} else {
    echo "Es necesario el metodo post";
}