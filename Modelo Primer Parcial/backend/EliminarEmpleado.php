<?php
include_once "./clases/Empleado.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST["id"];
    if ($id != null) {
        if (Empleado::Eliminar($id)) {
            echo json_encode(array("exito" => true, "mensaje" => "El Empleado se elimino correctamente"));
        } else {
            echo json_encode(array("exito" => true, "mensaje" => "El Empleado no se elimino correctamente"));
        }
    } else {
        echo json_encode(array("exito" => true, "mensaje" => "El Empleado no se elimino correctamente"));
    }
    
}