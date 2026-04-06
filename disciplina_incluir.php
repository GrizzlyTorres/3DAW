<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['bt_salvar'])) {
    $sigla = $_POST['sigla'];
    $nome = $_POST['nome'];
    $carg = $_POST['carga'];

    $linha = $sigla . ";" . $nome . ";" . $carga . PHP_EOL;

    $arqGravar = fopen("disciplina.txt", "a");
    fwrite($arqGravar, $linha);
    fclose($arqGravar);

    exit();
}
?>

  <!DOCTYPE html>
<html>
<body>
        
            <h1>Incluir disciplina</h1>
            <form method="post" action="">
                sigla:<input type="text" name="sigla" required>
                nome:<input type="text" name="nome" required>
                carga:<input type="number" name="carga" required>
                <input type="submit" name="bt_salvar" value="Salvar Disciplina">
            </form>
     
            <h1>Listar Disciplina</h1>
            <table>
                <tr>
                    <th>Sigla</th>
                    <th>Nome</th>
                    <th>carga</th>
                </tr>
                <?php
                $arqDisciplina = fopen("disciplina.txt", "r") or die("erro ao abrir arquivo");

                while (!feof($arqDisciplina)) {
                    $linha = fgets(stream: $arqDisciplina);
                    $colunaDados = explode(";", $linha);

                    echo "<tr>
                        <td>" . $colunaDados[0] . "</td>
                        <td>" . $colunaDados[1] . "</td>
                        <td>" . $colunaDados[2] . "</td>
                      </tr>";
                }

                fclose($arqDisciplina);
                $msg = "Deu tudo certo!";

                ?>
            </table>
            <p><?php echo $msg ?></p>
            <br>
</body>

</html>
