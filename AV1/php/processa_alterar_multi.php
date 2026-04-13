<?php
$id_alterar = $_POST['id'];
$pergunta = $_POST['pergunta'];
$opcaoA = $_POST['opcaoA'];
$opcaoB = $_POST['opcaoB'];
$opcaoC = $_POST['opcaoC'];
$opcaoD = $_POST['opcaoD'];
$correta = $_POST['correta'];

$nova_linha = $id_alterar . ";" . $pergunta . ";" . $opcaoA . ";" . $opcaoB . ";" . $opcaoC . ";" . $opcaoD . ";" . $correta . PHP_EOL;
$conteudo = "";

$arq_leitura = fopen('../perguntamulti.txt', 'r');

if ($arq_leitura) {
    while (($linha = fgets($arq_leitura)) !== false) {
        $dados = explode(';', $linha);
        
        if (trim($dados[0]) == trim($id_alterar)) {
            $conteudo .= $nova_linha;
        } else {
            $conteudo .= $linha;
        }
    }
    fclose($arq_leitura);
}

$arq_escrita = fopen('../perguntamulti.txt', 'w');
fwrite($arq_escrita, $conteudo);
fclose($arq_escrita);

echo "Pergunta de Múltipla Escolha alterada com sucesso!";
echo "<br><br><a href='../index.html'>Voltar</a>";
?>