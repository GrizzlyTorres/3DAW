function salvarUsuario() {
    let id = document.getElementById('id').value;
    let username = document.getElementById('username').value;
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let msgBox = document.getElementById('mensagem');

    if (id.trim() === "" || username.trim() === "" || nome.trim() === "" || email.trim() === "") {
        msgBox.innerHTML = "<span style='color: red;'>Todos os campos devem ser preenchidos!</span>";
        return;
    }

    let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        msgBox.innerHTML = "<span style='color: red;'>Por favor, insira um e-mail válido.</span>";
        return;
    }

    let dadosUsuario = {
        id: id,
        username: username,
        nome: nome,
        email: email
    };

    msgBox.innerHTML = "<span style='color: blue;'>Enviando dados...</span>";
    let xhr = new XMLHttpRequest();
    
    xhr.open("POST", "http://localhost:3000/usuarios", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                msgBox.innerHTML = "<span style='color: green;'>Usuário cadastrado com sucesso!</span>";
                document.getElementById("formUsuario").reset();
            } else {
                msgBox.innerHTML = "<span style='color: red;'>Erro ao cadastrar: " + xhr.status + "</span>";
            }
        }
    };

    xhr.send(JSON.stringify(dadosUsuario));
}