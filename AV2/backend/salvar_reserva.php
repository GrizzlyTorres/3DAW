<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(["erro" => "Não autorizado"]);
    exit;
}

$dados = json_decode(file_get_contents("php://input"), true);

if (!$dados || !isset($dados['veiculo_id'], $dados['data_retirada'], $dados['dias'], $dados['valor_aluguel'], $dados['valor_seguro'])) {
    http_response_code(400);
    echo json_encode(["erro" => "Dados inválidos ou incompletos."]);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$veiculo_id = $dados['veiculo_id'];
$data_retirada = $dados['data_retirada'];
$dias = (int)$dados['dias'];

$data_devolucao = date('Y-m-d', strtotime($data_retirada . " + $dias days"));

$valor_aluguel = $dados['valor_aluguel'];
$valor_seguro = $dados['valor_seguro'];

$host = 'localhost';
$dbname = 'fallscar';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO reservas (usuario_id, veiculo_id, data_retirada, data_devolucao, valor_aluguel, valor_seguro) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$usuario_id, $veiculo_id, $data_retirada, $data_devolucao, $valor_aluguel, $valor_seguro]);

    echo json_encode(["sucesso" => true]);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro no banco de dados: " . $e->getMessage()]);
}
?>