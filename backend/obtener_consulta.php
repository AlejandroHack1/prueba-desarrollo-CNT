<?php

Header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400'); // cache for 1 day
header('Content-Type: text/html; charset=utf-8');
header('Content-type: application/json');

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

$query = "SELECT * FROM consulta INNER JOIN tipo_consulta ON consulta.tipoConsulta = tipo_consulta.idtipo_consuta ORDER BY consulta.pacientesAtendidos DESC";

$result = mysqli_query($con, $query);

$response = array();
$enumerate = 0;
while ($row = mysqli_fetch_array($result)) {

    $row = array_map('utf8_encode', $row);
    array_push($response, array('row'=> $enumerate ,'idconsulta' => $row[0],

        'cantPacientes' => $row['cantPacientes'],
        'nombreEspecialista' => $row['nombreEspecialista'],
        'tipoConsulta' => $row['tipoConsulta'],
        'estado' => $row['estado'],
        'pacientesAtendidos' => $row['pacientesAtendidos'],
        'nombre' => $row['nombre'],
    ));

    $enumerate += 1;

}

echo json_encode(array('consulta' => $response));

mysqli_close($con);
