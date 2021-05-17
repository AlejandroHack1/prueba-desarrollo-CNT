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

$sql = "UPDATE consulta SET estado = 2 where tipoConsulta >= 1";
$query = $con->query($sql);

if ($query === true) {
    $response = "Se liberaron las consultas";
} else {
    $response = "Error: " . $sql . "<br>" . $db->error;
}

echo json_encode($response);

$con->close();
