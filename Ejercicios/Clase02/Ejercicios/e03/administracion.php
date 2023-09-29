<?php
    if (empty($_POST["txtNombre"]) || empty($_POST["txtApellido"]) || empty($_POST["txtDNI"]) || empty($_POST["txtSexo"]) || empty($_POST["txtLegajo"]) || empty($_POST["txtSueldo"])) {
        echo "Se enviaron datos vacios.";
        echo "<a href='index.html'>Volver al formulario</a>";
    } else {
        echo ``;
    }
?>