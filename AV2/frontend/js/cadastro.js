// Máscara para CPF (xxx.xxx.xxx-xx)
    document.getElementById('cad-cpf').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, ''); 
        
        if (valor.length > 11) valor = valor.slice(0, 11); 
        
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');       
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');       
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 

        e.target.value = valor;
    });

    // Máscara para Telefone ((xx) xxxxx-xxxx ou (xx) xxxx-xxxx)
    document.getElementById('cad-telefone').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length > 11) valor = valor.slice(0, 11);
        
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');   

        e.target.value = valor;
    });

    // Máscara para RG (xx.xxx.xxx-x)
    document.getElementById('cad-rg').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        if (valor.length > 9) valor = valor.slice(0, 9);
        
        valor = valor.replace(/(\d{2})(\d)/, '$1.$2');       
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');       
        valor = valor.replace(/(\d{3})(\d{1})$/, '$1-$2');   

        e.target.value = valor;
    });

    // Máscara para CNH (Apenas 11 números, sem pontuação)
    document.getElementById('cad-cnh').addEventListener('input', function (e) {
        let valor = e.target.value.replace(/\D/g, ''); 
        
        if (valor.length > 11) valor = valor.slice(0, 11); 
        
        e.target.value = valor;
    });

document.querySelector('.cadastro-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var senha = document.getElementById('cad-senha').value;
    var confirmaSenha = document.getElementById('cad-confirma-senha').value;

    if (senha !== confirmaSenha) {
        alert("Erro: As senhas não coincidem!");
        return;
    }

    var formData = new FormData(this);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/av2/backend/cadastro.php', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response.sucesso) {
                        alert(response.mensagem);
                        window.location.href = 'login.html';
                    } else {
                        alert("Erro: " + response.mensagem);
                    }
                } catch (e) {
                    alert("Erro ao processar a resposta do servidor.");
                    console.error("Resposta crua:", xhr.responseText);
                }
            } else {
                alert("Erro de conexão com o servidor. Status: " + xhr.status);
            }
        }
    };

    xhr.send(formData);
});
