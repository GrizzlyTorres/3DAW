<?php
$id = $_POST['id'];
$pergunta = $_POST['pergunta'];
$opcaoA = $_POST['opcaoA'];
$opcaoB = $_POST['opcaoB'];
$opcaoC = $_POST['opcaoC'];
$opcaoD = $_POST['opcaoD'];
$correta = $_POST['correta'];

$linha = $id . ";" . $pergunta . ";" . $opcaoA . ";" . $opcaoB . ";" . $opcaoC . ";" . $opcaoD . ";" . $correta . PHP_EOL;

$arquivo = fopen('../perguntamulti.txt', 'a');
fwrite($arquivo, $linha);
fclose($arquivo);

echo "Pergunta de Múltipla Escolha salva com sucesso!";
echo "<br><br><a href='../index.html'>Voltar</a>";
?>