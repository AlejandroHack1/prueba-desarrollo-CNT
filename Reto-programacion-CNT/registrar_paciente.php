<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400'); // cache for 1 day
header('Content-Type: text/html; charset=ISO-8859-1');

header('Content-Type: image/jpeg');

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

require "dbconnect.php";

$json = file_get_contents("php://input");

$data = json_decode($json, true);

$nombre = stripslashes(utf8_decode($data["nombre"]));
$nombre = str_replace("'", "", $nombre);
$edad = $data["edad"];
$historiaClinica = $data["historiaClinica"];
$prioridad = $data["prioridad"];
$riesgo = $data["riesgo"];
//$anosFumador = $data["anosFumador"];
//$tieneDieta = $data["tieneDieta"];
//$fumador = $data["fumador"];
//$relacionPesoEstaura = $data["relacionPesoEstaura"];

//joven
if (isset($data["fumador"])) {
    $fumador = $data["fumador"];

    if ($fumador == 1) {

        $anosFumador = $data["anosFumando"];

        $sql = "INSERT INTO paciente (nombre, edad, noHistoriaClinica, fumador, anosFumador, prioridad, riesgo) VALUES ('$nombre','$edad', '$historiaClinica','$fumador','$anosFumador','$prioridad','$riesgo')";
        $query = $con->query($sql);
    } else {

        $sql = "INSERT INTO paciente (nombre, edad, noHistoriaClinica, fumador, prioridad, riesgo) VALUES ('$nombre','$edad', '$historiaClinica','$fumador','$prioridad','$riesgo')";
        $query = $con->query($sql);

    }

}

//anciano
else if (isset($data["tieneDieta"])) {
    $tieneDieta = $data["tieneDieta"];
    $sql = "INSERT INTO paciente (nombre, edad, noHistoriaClinica, tieneDieta, prioridad, riesgo) VALUES ('$nombre','$edad', '$historiaClinica','$tieneDieta','$prioridad','$riesgo')";
    $query = $con->query($sql);

}

//niño

else if (isset($data["relacionPesoEstatura"])) {
    $relacionPesoEstaura = $data["relacionPesoEstatura"];
    $sql = "INSERT INTO paciente (nombre, edad, noHistoriaClinica, relacionPesoEstatura, prioridad, riesgo) VALUES ('$nombre','$edad', '$historiaClinica','$relacionPesoEstaura','$prioridad','$riesgo')";
    $query = $con->query($sql);
}

if ($query === true) {
    $response = "registro exitoso";
} else {
    $response = "Error: " . $sql . "<br>" . $db->error;
}

echo json_encode($response);

$con->close();
