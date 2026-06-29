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

    $sql = "SELECT * FROM veiculos WHERE ativo = 1";
    $params = [];

    if (!empty($_GET['busca_livre'])) {
        $sql .= " AND (modelo LIKE ? OR marca LIKE ?)";
        $termo = "%" . $_GET['busca_livre'] . "%";
        $params[] = $termo;
        $params[] = $termo;
    }

    $filtros_exatos = ['marca', 'estado', 'cidade', 'tipo', 'ano'];
    foreach ($filtros_exatos as $filtro) {
        if (!empty($_GET[$filtro])) {
            $sql .= " AND $filtro = ?";
            $params[] = $_GET[$filtro];
        }
    }

    if (!empty($_GET['assentos'])) {
        $sql .= " AND num_assentos = ?";
        $params[] = $_GET['assentos'];
    }

    if (isset($_GET['ar_condicionado']) && $_GET['ar_condicionado'] === 'on') {
        $sql .= " AND ar_condicionado = 1";
    }
    if (isset($_GET['multimidia']) && $_GET['multimidia'] === 'on') {
        $sql .= " AND multimidia = 1";
    }
    if (isset($_GET['pcd']) && $_GET['pcd'] === 'on') {
        $sql .= " AND adaptado_pcd = 1";
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $veiculos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($veiculos);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro de conexão: " . $e->getMessage()]);
}
?>