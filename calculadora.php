<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $a = $_POST["a"];
        $b = $_POST["b"];
        $op = $_POST["operacao"]; 

        
        if ($op == "somar") {
            $resultado = $a + $b;
        } elseif ($op == "subtrair") {
            $resultado = $a - $b;
        } elseif ($op == "multiplicar") {
            $resultado = $a * $b;
        } elseif ($op == "dividir") {
            
            if ($b != 0) {
                $resultado = $a / $b;
            } else {
                $resultado = "Erro: Divisão por zero!";
            }
        }
    }
?>
<!DOCTYPE html>
<html>
<body>
<h1><?php echo 'Minha Calculadora!';?></h1>

<form method='POST' action='calculadora.php'>
    a:<input type=text name='a'><br>
    b:<input type=text name='b'><br>
    
    Operação:
    <select name="operacao">
        <option value="somar">Somar (+)</option>
        <option value="subtrair">Subtrair (-)</option>
        <option value="multiplicar">Multiplicar (*)</option>
        <option value="dividir">Dividir (/)</option>
    </select>
    
    <input type=submit value='Calcular'>
    <br><br>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        echo 'Resultado: ' . $resultado; 
    }
    ?>
</form>
    
</body>
</html>