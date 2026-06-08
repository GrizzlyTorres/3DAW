function consultarUsuario() {
    let id = document.getElementById('id').value;
    let msgBox = document.getElementById('mensagem');
    let dadosBox = document.getElementById('dadosUsuario');

    if (id.trim() === "") {
        msgBox.innerHTML = "<span style='color: red;'>O campo Id deve ser preenchido!</span>";
        dadosBox.innerHTML = "";
        return;
    }

    msgBox.innerHTML = "<span style='color: blue;'>Buscando dados...</span>";
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/usuarios/" + encodeURIComponent(id), true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let usuario = JSON.parse(xhr.responseText);
                msgBox.innerHTML = "<span style='color: green;'>Usuário encontrado com sucesso!</span>";
                dadosBox.innerHTML = "<strong>Username:</strong> " + usuario.username + "<br>" +
                                     "<strong>Nome:</strong> " + usuario.nome + "<br>" +
                                     "<strong>Email:</strong> " + usuario.email;
            } else if (xhr.status === 404) {
                msgBox.innerHTML = "<span style='color: red;'>Usuário não encontrado!</span>";
                dadosBox.innerHTML = "";
            } else {
                msgBox.innerHTML = "<span style='color: red;'>Erro ao buscar: " + xhr.status + "</span>";
                dadosBox.innerHTML = "";
            }
        }
    };

    xhr.send();
}
