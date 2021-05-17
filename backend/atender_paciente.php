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

$idpaciente = $data['idpaciente'];
$tipoconsulta = $data['tipoconsulta'];

$sql1 = "UPDATE consulta set estado = 1, pacientesAtendidos = pacientesAtendidos + 1  where tipoConsulta = $tipoconsulta";
$query1 = $con->query($sql1);

$sql2 = "INSERT INTO informe (idpaciente, idconsulta) VALUES ('$idpaciente','$tipoconsulta')";
$query2 = $con->query($sql2);


$sql = "UPDATE paciente set enAtencion = 1 where idpaciente = $idpaciente";
$query = $con->query($sql);

if ($query === true && $query1 === true && $query2 === true) {
    $response = "En consulta";
} else {
    $response = "Error: " . $sql . "<br>" . $db->error;
}

echo json_encode($response);

$con->close();
