<?php
require_once "./clases/Alumno.php";
use Rivoira\Alumno;


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $extension = pathinfo($_FILES["foto"]["name"], PATHINFO_EXTENSION);
    $nombreFoto = $_POST['legajo'] . '.' . $extension;
    $destino = "./fotos/" . $nombreFoto;
    switch (strtolower($_POST["accion"])) {
        case 'agregar':
            if (Alumno::AgregarAF(new Alumno($_POST['legajo'], $_POST['nombre'], $_POST['apellido'], $destino)) && move_uploaded_file($_FILES["foto"]["tmp_name"], $destino)) {
                echo "Alumno agregado correctamente";
            } else {
                echo "Algo salio mal! :c";
            }
            break;
        case 'borrar':
            if (Alumno::EliminarAF(new Alumno($_POST['legajo'], $_POST['nombre'], $_POST['apellido']))) {
                echo "Alumno borrado correctamente";
            } else {
                echo "Algo salio mal! :c";
            }
            break;
        case 'modificar':
            if (Alumno::ModificarAF(new Alumno($_POST['legajo'], $_POST['nombre'], $_POST['apellido'], $destino)) && move_uploaded_file($_FILES["foto"]["tmp_name"], $destino)) {
                echo "Alumno modificado correctamente";
            } else {
                echo "Algo salio mal! :c";
            }
            break;
        case 'listar':
            echo Alumno::LeerAF();
            break;

        case 'listar_objetos':
            $alumnos = Alumno::listarObjetos();
            if (isset($alumnos)) {
                echo json_encode($alumnos);
            } else {
                echo "Algo salio mal al listar los objetos";
            }
            break;
        
        case 'listar_tabla':
            echo Alumno::ListarTabla();
            break;

        default:
            echo "Algo salio mal! :c";
            break;
    }
}