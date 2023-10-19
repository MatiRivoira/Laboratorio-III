<?php
include_once "./clases/Empleado.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $empleados = Empleado::TraerTodos();
    if (isset($empleados)) {
        $html = '<h1>Listado de empleados</h1>';
        $html .= '<table>';
        $html .= '<thead>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Id_perfil</th>
                    <th>Perfil</th>
                    <th>Sueldo</th>
                    <th>Foto</th>
                    <th>Accion</th>
                    </thead>';
        foreach ($empleados as $empleado) {
            $html .= "<tr>
                      <td>$empleado->id</td>
                      <td>$empleado->nombre</td>
                      <td>$empleado->correo</td>
                      <td>$empleado->id_perfil</td>
                      <td>$empleado->perfil</td>
                      <td>$empleado->sueldo</td> " .
                     '<td><img src="./backend/' . $empleado->foto["tmp_name"]  . '" width="50px" height="50px"></td>
                      <td>' .
                       '<input type="button" value="modificar" data-obj=' . json_encode($empleado) .' data-action="modificar">
                        <input type="button" value="eliminar" data-obj=' . json_encode($empleado) .' data-action="eliminar">
                      </td>
                      </tr>';
        }
        $html .= "</table>";
        echo $html;
    } else {
        echo "No se pudo traer a los empleados";
    }
}