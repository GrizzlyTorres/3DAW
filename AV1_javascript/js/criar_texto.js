function salvarPerguntaTexto() {
    let id = document.getElementById('id').value;
    let pergunta = document.getElementById('pergunta').value;
    let resposta = document.getElementById('resposta').value;
    let msgBox = document.getElementById('mensagem');

    if (id.trim() === "" || pergunta.trim() === "" || resposta.trim() === "") {
        msgBox.innerHTML = "<span style='color: red;'>Todos os campos devem ser preenchidos!</span>";
        return;
    }

    let dadosTexto = {
        id: id,
        pergunta: pergunta,
        resposta: resposta
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/perguntas_texto", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                msgBox.innerHTML = "<span style='color: green;'>Pergunta salva com sucesso!</span>";
                document.getElementById("formTexto").reset();
            } else {
                msgBox.innerHTML = "<span style='color: red;'>Erro ao salvar: " + xhr.status + "</span>";
            }
        }
    };

    xhr.send(JSON.stringify(dadosTexto));
}