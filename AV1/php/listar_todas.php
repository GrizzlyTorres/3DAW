<?php
echo "<h2>Todas as Perguntas Cadastradas</h2>";

echo "<h3>Múltipla Escolha</h3>";
if (file_exists('../txt/perguntamulti.txt')) {
    $arq_multi = fopen('../txt/perguntamulti.txt', 'r');
    if ($arq_multi) {
        while (($linha = fgets($arq_multi)) !== false) {
            if (trim($linha) != '') {
                $dados = explode(';', $linha);
                echo "<p><b>ID: " . $dados[0] . "</b> | Pergunta: " . $dados[1] . "<br>";
                echo "Opções: A) " . $dados[2] . " | B) " . $dados[3] . " | C) " . $dados[4] . " | D) " . $dados[5] . "<br>";
                echo "Correta: " . $dados[6] . "</p><hr>";
            }
        }
        fclose($arq_multi);
    }
}

echo "<h3>Texto Livre</h3>";
if (file_exists('../txt/perguntatext.txt')) {
    $arq_text = fopen('../txt/perguntatext.txt', 'r');
    if ($arq_text) {
        while (($linha = fgets($arq_text)) !== false) {
            if (trim($linha) != '') {
                $dados = explode(';', $linha);
                echo "<p><b>ID: " . $dados[0] . "</b> | Pergunta: " . $dados[1] . "<br>";
                echo "Resposta Esperada: " . $dados[2] . "</p><hr>";
            }
        }
        fclose($arq_text);
    }
}

echo "<br><a href='../html/index.html'>Voltar ao Menu</a>";
?>