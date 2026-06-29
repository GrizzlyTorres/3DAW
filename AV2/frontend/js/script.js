document.addEventListener('DOMContentLoaded', function () {
    var authContainer = document.querySelector('.auth-buttons');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../../backend/check_auth.php', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.logado) {
                authContainer.innerHTML = `
                    <span style="color: #fff; margin-right: 15px;">Olá, ${response.nome}</span>
                    <button id="btn-logout" class="nav-link-btn" style="cursor: pointer;">SAIR</button>
                `;

                document.getElementById('btn-logout').addEventListener('click', function () {
                    var xhrLogout = new XMLHttpRequest();
                    xhrLogout.open('POST', '../../backend/logout.php', true);
                    xhrLogout.onload = function () {
                        window.location.href = '../html/index.html';
                    };
                    xhrLogout.send();
                });
            }
        }
    };
    xhr.send();
});

document.addEventListener('DOMContentLoaded', () => {

    const listaVeiculos = document.getElementById('lista-veiculos');

    if (listaVeiculos) {
        listaVeiculos.innerHTML = "<li>Carregando veículos...</li>";

        const xhrVeiculos = new XMLHttpRequest();
        xhrVeiculos.open('GET', '../../backend/index.php', true);

        xhrVeiculos.onreadystatechange = function () {
            if (xhrVeiculos.readyState === 4) {
                if (xhrVeiculos.status === 200) {
                    try {
                        const dados = JSON.parse(xhrVeiculos.responseText);

                        if (dados.erro) {
                            listaVeiculos.innerHTML = `<li>Erro: ${dados.erro}</li>`;
                            return;
                        }

                        listaVeiculos.innerHTML = '';

                        dados.forEach(veiculo => {
                            const precoFormatado = parseFloat(veiculo.preco).toFixed(2).replace('.', ',');
                            const li = document.createElement('li');

                            li.innerHTML = `
                                <article class="vehicle-card">
                                    <figure>
                                        <img src="${veiculo.imagem}" alt="Foto da categoria ${veiculo.categoria}" class="vehicle-img">
                                    </figure>
                                    <h3>${veiculo.categoria}</h3>
                                    <p class="vehicle-models">${veiculo.modelos}</p>
                                    <p class="vehicle-group">${veiculo.grupo}</p>
                                    <p class="vehicle-price">Diária: R$ ${precoFormatado}</p>
                                </article>
                            `;
                            listaVeiculos.appendChild(li);
                        });
                    } catch (e) {
                        console.error('Erro ao processar JSON:', e);
                        listaVeiculos.innerHTML = `<li>Erro ao processar resposta do servidor.</li>`;
                    }
                } else {
                    console.error('Falha na requisição:', xhrVeiculos.status);
                    listaVeiculos.innerHTML = `<li>Não foi possível carregar os veículos no momento.</li>`;
                }
            }
        };

        xhrVeiculos.onerror = function() {
            listaVeiculos.innerHTML = `<li>Erro de conexão com o servidor.</li>`;
        };

        xhrVeiculos.send();
    }
});