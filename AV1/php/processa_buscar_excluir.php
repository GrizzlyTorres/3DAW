<?php
$id_busca = $_POST['id'];
$tipo = $_POST['tipo'];
$acao = $_POST['acao'];

if ($tipo == 'multi') {
    $arquivo_nome = '../txt/perguntamulti.txt';
} else {
    $arquivo_nome = '../txt/perguntatext.txt';
}

if (!file_exists($arquivo_nome)) {
    die("Arquivo não encontrado. <br><br><a href='../html/index.html'>Voltar</a>");
}

$encontrado = false;
$conteudo = "";

$arq_leitura = fopen($arquivo_nome, 'r');

if ($arq_leitura) {
    while (($linha = fgets($arq_leitura)) !== false) {
        if (trim($linha) != '') {
            $dados = explode(';', $linha);
            
            if (trim($dados[0]) == trim($id_busca)) {
                $encontrado = true;
                
                if ($acao == 'listar') {
                    echo "<h2>Pergunta Encontrada:</h2>";
                    echo "<p><b>ID:</b> " . $dados[0] . "<br>";
                    echo "<b>Pergunta:</b> " . $dados[1] . "<br>";
                    
                    if ($tipo == 'multi') {
                        echo "<b>Opções:</b> A) " . $dados[2] . " | B) " . $dados[3] . " | C) " . $dados[4] . " | D) " . $dados[5] . "<br>";
                        echo "<b>Correta:</b> " . $dados[6] . "</p>";
                    } else {
                        echo "<b>Resposta:</b> " . $dados[2] . "</p>";
                    }
                    $conteudo .= $linha; 
                }
            } else {
                $conteudo .= $linha;
            }
        }
    }
    fclose($arq_leitura);
}

if (!$encontrado) {
    echo "Pergunta com ID " . $id_busca . " não encontrada. <br><br>";
} else if ($acao == 'excluir') {
    $arq_escrita = fopen($arquivo_nome, 'w');
    fwrite($arq_escrita, $conteudo);
    fclose($arq_escrita);
    echo "Pergunta excluída com sucesso! <br><br>";
}

echo "<a href='../html/index.html'>Voltar ao Menu</a>";
?>