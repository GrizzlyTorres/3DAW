document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE CARREGAMENTO DOS VEÍCULOS ---
    const listaVeiculos = document.getElementById('lista-veiculos');

    if (listaVeiculos) {
        fetch('http://localhost/AV2/backend/api.php')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao carregar os dados');
                return response.json();
            })
            .then(dados => {
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
            })
            .catch(erro => {
                console.error('Falha na requisição:', erro);
                listaVeiculos.innerHTML = `<li>Não foi possível carregar os veículos no momento.</li>`;
            });
    }

    // --- LÓGICA DOS MODAIS (LOGIN E CADASTRO) ---
    const btnAuthUnificado = document.getElementById('btn-auth-unificado');
    const modalLogin = document.getElementById('modal-login');
    const modalCadastro = document.getElementById('modal-cadastro');

    const btnFecharLogin = document.getElementById('btn-fechar-login');
    const btnFecharCadastro = document.getElementById('btn-fechar-cadastro');

    const linkIrCadastro = document.getElementById('link-ir-cadastro');
    const linkVoltarLogin = document.getElementById('link-voltar-login');

    if (btnAuthUnificado && modalLogin) {
        btnAuthUnificado.addEventListener('click', (event) => {
            event.preventDefault();
            modalLogin.showModal();
        });
    }

    if (btnFecharLogin && modalLogin) {
        btnFecharLogin.addEventListener('click', () => modalLogin.close());
        modalLogin.addEventListener('click', (event) => {
            if (event.target === modalLogin) modalLogin.close();
        });
    }

    if (btnFecharCadastro && modalCadastro) {
        btnFecharCadastro.addEventListener('click', () => modalCadastro.close());
        modalCadastro.addEventListener('click', (event) => {
            if (event.target === modalCadastro) modalCadastro.close();
        });
    }

    if (linkIrCadastro && modalLogin && modalCadastro) {
        linkIrCadastro.addEventListener('click', (event) => {
            event.preventDefault();
            modalLogin.close();
            modalCadastro.showModal();
        });
    }

    if (linkVoltarLogin && modalLogin && modalCadastro) {
        linkVoltarLogin.addEventListener('click', (event) => {
            event.preventDefault();
            modalCadastro.close();
            modalLogin.showModal();
        });
    }
});
