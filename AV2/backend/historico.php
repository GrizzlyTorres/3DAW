<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'fallscar';
$user = 'root';
$pass = '';

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(["erro" => "Não autorizado", "logado" => false]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT r.*, v.modelo, v.marca, v.ano, v.imagem_path 
            FROM reservas r
            JOIN veiculos v ON r.veiculo_id = v.id
            WHERE r.usuario_id = ?
            ORDER BY r.data_retirada DESC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$usuario_id]);
    $historico = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($historico);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro no banco de dados: " . $e->getMessage()]);
}
?>