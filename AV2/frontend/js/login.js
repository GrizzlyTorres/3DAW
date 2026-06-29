document.querySelector('.modal-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var feedbackDiv = document.getElementById('feedback-login');
    feedbackDiv.style.display = 'none';

    var formData = new FormData(this);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../../backend/login.php', true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { 
            if (xhr.status === 200) {
                try {
                    var response = JSON.parse(xhr.responseText);
                    if (response.sucesso) {
                        window.location.href = '../html/index.html';
                    } else {
                        feedbackDiv.textContent = response.mensagem;
                        feedbackDiv.style.display = 'block';
                    }
                } catch (e) {
                    feedbackDiv.textContent = "Erro ao processar resposta do servidor.";
                    feedbackDiv.style.display = 'block';
                }
            } else {
                feedbackDiv.textContent = "Erro de conexão com o servidor (Status: " + xhr.status + ")";
                feedbackDiv.style.display = 'block';
            }
        }
    };

    xhr.send(formData);
});