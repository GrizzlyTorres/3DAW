<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $a = isset($_POST["a"]) ? (float)$_POST["a"] : 0;
        $b = isset($_POST["b"]) ? (float)$_POST["b"] : 0;
        $op = $_POST["operacao"]; 

        
        switch ($op) {
            case "somar":
                $resultado = $a + $b;
                break;
            case "subtrair":
                $resultado = $a - $b;
                break;
            case "multiplicar":
                $resultado = $a * $b;
                break;
            case "dividir":
                $resultado = ($b != 0) ? ($a / $b) : "Erro: Divisão por zero!";
                break;
            case "potencia":
                $resultado = pow($a, $b); 
                break;
            case "raiz":
                $resultado = ($a >= 0) ? sqrt($a) : "Erro: Raiz de número negativo!";
                break;
            case "log":
                $resultado = ($a > 0) ? log10($a) : "Erro: Logaritmo de número <= 0!";
                break;
        }
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Calculadora PHP</title>
    <style>
        /* Adicionando a cor cinza no fundo e um estilo básico */
        body {
            background-color: #d1d1d1; 
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .calc-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
        }
        input, select { margin-bottom: 10px; padding: 5px; }
        .resultado { font-weight: bold; color: #2c3e50; margin-top: 15px; }
    </style>
</head>
<body>
<div class="calc-container">
    <h1>Minha Calculadora!</h1>

    <form method='POST' action=''>
        Valor A: <input type="number" step="any" name='a' required value="<?php echo isset($a) ? $a : ''; ?>"><br>
        Valor B: <input type="number" step="any" name='b' value="<?php echo isset($b) ? $b : ''; ?>"><br>
        <small>* Valor B ignorado em Raiz e Log.</small><br><br>
        
        Operação:
        <select name="operacao">
            <option value="somar">Somar (+)</option>
            <option value="subtrair">Subtrair (-)</option>
            <option value="multiplicar">Multiplicar (*)</option>
            <option value="dividir">Dividir (/)</option>
            <option value="potencia">Potência (a^b)</option>
            <option value="raiz">Raiz Quadrada (√a)</option>
            <option value="log">Logaritmo (log10 a)</option>
        </select>
        
        <input type="submit" value='Calcular'>
    </form>

    <?php if ($_SERVER["REQUEST_METHOD"] == "POST"): ?>
        <div class="resultado">
            Resultado: <?php echo $resultado; ?>
        </div>
    <?php endif; ?>
</div>
    
</body>
</html>