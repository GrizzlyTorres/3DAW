<?php
session_start();
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'fallscar';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = $_POST['email'] ?? '';
        $senha = $_POST['senha'] ?? '';

        $stmt = $pdo->prepare("SELECT id, nome, senha FROM usuarios WHERE email = :email");
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            $_SESSION['usuario_id'] = $user['id'];
            $_SESSION['usuario_nome'] = $user['nome'];

            echo json_encode(["sucesso" => true, "mensagem" => "Login realizado com sucesso!"]);
        } else {
            echo json_encode(["sucesso" => false, "mensagem" => "Email ou senha incorretos."]);
        }
    }
} catch(PDOException $e) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro de conexão: " . $e->getMessage()]);
}
?>