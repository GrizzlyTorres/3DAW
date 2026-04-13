<?php
$id_alterar = $_POST['id'];
$pergunta = $_POST['pergunta'];
$resposta = $_POST['resposta'];

$nova_linha = $id_alterar . ";" . $pergunta . ";" . $resposta . PHP_EOL;
$conteudo = "";

$arq_leitura = fopen('../perguntatext.txt', 'r');

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

$arq_escrita = fopen('perguntatext.txt', 'w');
fwrite($arq_escrita, $conteudo);
fclose($arq_escrita);

echo "Pergunta de Texto alterada com sucesso!"; 
echo "<br><br><a href='../index.html'>Voltar</a>";
?>