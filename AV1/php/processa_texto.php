<?php
$id = $_POST['id'];
$pergunta = $_POST['pergunta'];
$resposta = $_POST['resposta'];

$linha = $id . ";" . $pergunta . ";" . $resposta . PHP_EOL;

$arquivo = fopen('perguntatext.txt', 'a');
fwrite($arquivo, $linha);
fclose($arquivo);

echo "Pergunta de Texto salva com sucesso!";
echo "<br><br><a href='index.html'>Voltar</a>";
?>