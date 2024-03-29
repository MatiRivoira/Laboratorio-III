<?php
include_once "./clases/Usuario.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $usuarios = Usuario::TraerTodos();
    if (isset($usuarios)) {
        $html = '<h1>Listado de Usuarios</h1>';
        $html .= '<table>';
        $html .= '<thead>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Id_perfil</th>
                    <th>Perfil</th>
                    </thead>';
        foreach ($usuarios as $usuario) {
            $html .= "<tr>
                      <td>$usuario->id</td>
                      <td>$usuario->nombre</td>
                      <td>$usuario->correo</td>
                      <td>$usuario->id_perfil</td>
                      <td>$usuario->perfil</td>
                      <td>" .
                       '<input type="button" value="modificar" data-obj=' . json_encode($usuario) .' data-action="modificar">
                        <input type="button" value="eliminar" data-obj=' . json_encode($usuario) .' data-action="eliminar">
                      </td>
                      </tr>';
        }
        $html .= "</table>";
        echo $html;
    } else {
        echo "No se pudo traer a los usuarios";
    }
}