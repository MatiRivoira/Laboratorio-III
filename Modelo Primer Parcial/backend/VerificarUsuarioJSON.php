<?php
include_once "./clases/Usuario.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $jsonRecibido = file_get_contents("php://input");
    $data = json_decode($jsonRecibido, true);
    if ($data !== null) {
        $resultado = Usuario::TraerUno($data);
        
        if ($resultado !== null) {
            if ($resultado->id != 0) {
                $respuesta = array("exito" => true, "mensaje" => "Usuario verificado");
            } else {
                $respuesta = array("exito" => false, "mensaje" => "Usuario no encontrado");
            }
        } else {
            $respuesta = array("exito" => false, "mensaje" => "Resultado es null");
        }

        // Responder con un JSON
        header("Content-Type: application/json");
        echo json_encode($respuesta); 
    }
}