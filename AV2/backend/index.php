<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'fallscar';
$user = 'root'; 
$pass = '';     

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM vitrine");
    $veiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($veiculos);

} catch(PDOException $e) {
    echo json_encode(["erro" => "Erro de conexão: " . $e->getMessage()]);
}
?>