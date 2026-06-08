function excluirUsuario() {
    let id = document.getElementById('id').value;
    let msgBox = document.getElementById('mensagem');

    if (id.trim() === "") {
        msgBox.innerHTML = "<span style='color: red;'>O campo Id deve ser preenchido!</span>";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:3000/usuarios/" + encodeURIComponent(id), true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 204) {
                msgBox.innerHTML = "<span style='color: green;'>Usuário excluído com sucesso!</span>";
                document.getElementById("formExcluir").reset();
            } else if (xhr.status === 404) {
                msgBox.innerHTML = "<span style='color: red;'>Usuário não encontrado!</span>";
            } else {
                msgBox.innerHTML = "<span style='color: red;'>Erro ao excluir: " + xhr.status + "</span>";
            }
        }
    };

    xhr.send();
}
