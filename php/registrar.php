<?php 
include 'conexion.php';
// Recibir los datos del formulario y almacenarlos en las variables
$material = $_POST["material"];
$ftu = $_POST["ftu"];
$fcu = $_POST["fcu"];
$fyu = $_POST["fyu"];
$E = $_POST["E"];


$insertar = "INSERT INTO tbMateriales(material,ftu,fcu,fyu,ModuloYoung) VALUES ('$material',$ftu,$fcu,$fyu,$E)";



$verificar_material = mysqli_query($conexion,"SELECT * FROM tbMateriales WHERE material = '$material'");




if (mysqli_num_rows($verificar_material) > 0) {
    echo '<script>    
         alert("El material ya existe");
         window.history.go(-1);
        </script>';  
    exit;
}



$resultado = mysqli_query($conexion,$insertar);
if (!$resultado) {
    echo '<script> 
            alert("Error de registro");
            window.history.go(-1);
        </script>';
} else {
    echo '<script> 
            alert("Registro efecturado correctamente");
            window.location.href = "index.html"; 
        </script>';   
}


mysqli_close($conexion);