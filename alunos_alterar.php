<?php
$matricula_busca = "";
$aluno_encontrado = null;
$msg = "";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['bt_alterar'])) {
    $matricula_edit = $_POST['matricula'];
    $nome_novo = $_POST['nome'];
    $email_novo = $_POST['email'];

    $linhas = file("alunos.txt"); 
    $novo_conteudo = "";
    $sucesso = false;

    foreach ($linhas as $linha) {
        $colunas = explode(";", trim($linha));
        
        
        if ($colunas[0] == $matricula_edit) {
            $novo_conteudo .= $matricula_edit . ";" . $nome_novo . ";" . $email_novo . PHP_EOL;
            $sucesso = true;
        } else {
            $novo_conteudo .= trim($linha) . PHP_EOL;
        }
    }

    file_put_contents("alunos.txt", $novo_conteudo); 
    $msg = $sucesso ? "Aluno alterado com sucesso!" : "Erro ao alterar aluno.";
}

if (isset($_GET['busca_matricula'])) {
    $matricula_busca = $_GET['busca_matricula'];
    $arquivo = fopen("alunos.txt", "r");

    while (!feof($arquivo)) {
        $linha = fgets($arquivo);
        if ($linha) {
            $colunas = explode(";", trim($linha));
            if ($colunas[0] == $matricula_busca) {
                $aluno_encontrado = $colunas;
                break;
            }
        }
    }
    fclose($arquivo);
    if (!$aluno_encontrado) $msg = "Aluno não encontrado!";
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Alterar Aluno</title>
    <style>
        .box { border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
        label { display: block; margin-top: 10px; }
    </style>
</head>
<body>

    <h1>Alterar Cadastro de Aluno</h1>

    <div class="box">
        <h3>1. Buscar por Matrícula</h3>
        <form method="get" action="">
            Matrícula: <input type="text" name="busca_matricula" value="<?php echo $matricula_busca; ?>" required>
            <input type="submit" value="Buscar">
        </form>
    </div>

    <?php if ($aluno_encontrado): ?>
    <div class="box">
        <h3>2. Editar Dados</h3>
        <form method="post" action="alunos_alterar.php">
            <input type="hidden" name="matricula" value="<?php echo $aluno_encontrado[0]; ?>">
            
            <label>Nome:</label>
            <input type="text" name="nome" value="<?php echo $aluno_encontrado[1]; ?>" required>

            <label>Email:</label>
            <input type="email" name="email" value="<?php echo $aluno_encontrado[2]; ?>" required>

            <br><br>
            <input type="submit" name="bt_alterar" value="Confirmar Alteração">
        </form>
    </div>
    <?php endif; ?>

    <p><strong><?php echo $msg; ?></strong></p>
    <a href="Alunos.php">Voltar para a Lista</a>

</body>
</html>
