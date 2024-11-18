<?php
$conexion = mysqli_connect("localhost","root","","dbMateriales");
if (!$conexion) {
    echo 'No se pudo conectar a la base de datos';
} else {
    echo 'Conexion cqorrecta';
}