function salvarPerguntaMulti() {
    let id = document.getElementById('id').value;
    let pergunta = document.getElementById('pergunta').value;
    let opcaoA = document.getElementById('opcaoA').value;
    let opcaoB = document.getElementById('opcaoB').value;
    let opcaoC = document.getElementById('opcaoC').value;
    let opcaoD = document.getElementById('opcaoD').value;
    let opcaoE = document.getElementById('opcaoE').value;
    let msgBox = document.getElementById('mensagem');

    let correta = document.querySelector('input[name="correta"]:checked');

    if (id.trim() === "" || pergunta.trim() === "" || opcaoA.trim() === "") {
        msgBox.innerHTML = "<span style='color: red;'>Os campos principais devem ser preenchidos!</span>";
        return;
    }

    if (!correta) {
        msgBox.innerHTML = "<span style='color: red;'>Selecione qual é a resposta correta!</span>";
        return;
    }

    let dadosPergunta = {
        id: id,
        pergunta: pergunta,
        opcoes: {
            A: opcaoA,
            B: opcaoB,
            C: opcaoC,
            D: opcaoD,
            E: opcaoE
        },
        resposta_correta: correta.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/perguntas_multi", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                msgBox.innerHTML = "<span style='color: green;'>Pergunta salva com sucesso!</span>";
                document.getElementById("formMulti").reset();
            } else {
                msgBox.innerHTML = "<span style='color: red;'>Erro ao salvar: " + xhr.status + "</span>";
            }
        }
    };

    xhr.send(JSON.stringify(dadosPergunta));
}