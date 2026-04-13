<?php
$id = $_POST['id'];
$username = $_POST['username'];
$nome = $_POST['nome'];
$email = $_POST['email'];

$linha = $id . ";" . $username . ";" . $nome . ";" . $email . PHP_EOL;

$arquivo = fopen('usuarios.txt', 'a');
fwrite($arquivo, $linha);
fclose($arquivo);

echo "Usuário cadastrado com sucesso!";
echo "<br><br><a href='../index.html'>Voltar</a>";
?>