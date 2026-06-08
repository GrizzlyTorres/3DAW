function consultarPerguntaTexto() {
    let id = document.getElementById('id').value;
    let msgBox = document.getElementById('mensagem');
    let dadosBox = document.getElementById('dadosPergunta');

    if (id.trim() === "") {
        msgBox.innerHTML = "<span style='color: red;'>O campo Id deve ser preenchido!</span>";
        dadosBox.innerHTML = "";
        return;
    }

    msgBox.innerHTML = "<span style='color: blue;'>Buscando pergunta...</span>";
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/perguntas_texto/" + encodeURIComponent(id), true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let perguntaObj = JSON.parse(xhr.responseText);
                msgBox.innerHTML = "<span style='color: green;'>Pergunta encontrada com sucesso!</span>";
                
                let htmlDados = "<strong>Pergunta:</strong> " + perguntaObj.pergunta + "<br><br>" +
                                "<strong>Resposta Esperada:</strong> " + perguntaObj.resposta;
                                
                dadosBox.innerHTML = htmlDados;
            } else if (xhr.status === 404) {
                msgBox.innerHTML = "<span style='color: red;'>Pergunta não encontrada!</span>";
                dadosBox.innerHTML = "";
            } else {
                msgBox.innerHTML = "<span style='color: red;'>Erro ao buscar: " + xhr.status + "</span>";
                dadosBox.innerHTML = "";
            }
        }
    };

    xhr.send();
}
