<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'fallscar';
$username = 'root'; 
$password = '';     

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST['nome'] ?? '';
        $cnh = $_POST['cnh'] ?? '';
        $email = $_POST['email'] ?? '';
        $categoria_cnh = $_POST['categoria_cnh'] ?? '';
        $cpf = $_POST['cpf'] ?? '';
        $data_nascimento = $_POST['data_nascimento'] ?? '';
        $senha = $_POST['senha'] ?? '';
        $rg = $_POST['rg'] ?? '';
        $telefone = $_POST['telefone'] ?? '';

        $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nome, cnh, email, categoria_cnh, cpf, data_nascimento, senha, rg, telefone)
                VALUES (:nome, :cnh, :email, :categoria_cnh, :cpf, :data_nascimento, :senha, :rg, :telefone)";

        $stmt = $pdo->prepare($sql);

        $stmt->execute([
            ':nome' => $nome,
            ':cnh' => $cnh,
            ':email' => $email,
            ':categoria_cnh' => $categoria_cnh,
            ':cpf' => $cpf,
            ':data_nascimento' => $data_nascimento,
            ':senha' => $senhaHash,
            ':rg' => $rg,
            ':telefone' => $telefone
        ]);

        echo json_encode(["sucesso" => true, "mensagem" => "Cadastro realizado com sucesso!"]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Método inválido."]);
    }

} catch(PDOException $e) {
    $erro = $e->getMessage();
    
    if (strpos($erro, 'Duplicate entry') !== false) {
        echo json_encode(["sucesso" => false, "mensagem" => "CPF ou Email já cadastrados no sistema."]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Erro no servidor: " . $erro]);
    }
}
?>