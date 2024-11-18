<!DOCTYPE html>
<html lang="en">
<head>
|   <title>TABLAS - ALONDRA GORETTI GONZALEZ MARTINEZ</title> 
</head>
<body>
<div class="main">
<header class="header">
    <h1 class="header-1">Tabla de Materiales</h1>      
</header>
<div class="container my-4">
<table class="table table-dark table-striped">
<thead>

            <tr>
            <th scope="col">ID</th>

            <th scope="col">Material</th>

            <th scope="col">FTU</th>

            <th scope="col">FCU</th>

            <th scope="col">FYU</th>

            <th scope="col">Modulo de elasticidad</th>
            
            </tr>
  </thead>

  <tbody>

    <?php

    $conexion = mysqli_connect("localhost","root","","dbmateriales");
    if(!$conexion) {
        die("La conexión no fue exitosa");
        exit;
    }

    $sql = "SELECT * FROM tbMateriales";

    $result = mysqli_query($conexion,$sql);

    while($row = mysqli_fetch_array($result)) {

                    $id = $row["idMat"];  

                    $material = $row["MATERIAL"];  
        
        
        $fcu = $row["FCU"];  

        $fyu = $row["FYU"];

        $e   = $row["ModuloYoung"]; 

                echo "<tr>

                    <th scope='row'>$id</th>
                    
                    <td>$material</td>

                    <td>$ftu</td>

                    <td>$fcu </td>

                    <td>$fyu</td>

                    <td>$e</td>

                    </tr>";
                } 
                mysqli_close($conexion);
    ?>
  </tbody>
</table>
<a style="text-decoration: none;" href="./index.html" class="boton">Formulario</a>
</div>
</div>
</body>
</html>