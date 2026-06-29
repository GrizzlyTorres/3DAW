document.addEventListener("DOMContentLoaded", () => {
    
    const listaHistorico = document.getElementById("lista-historico");

    const carregarHistorico = () => {
        listaHistorico.innerHTML = "<p>Carregando histórico...</p>";
        
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "../../backend/historico.php", true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        
                        listaHistorico.innerHTML = "";

                        if (!Array.isArray(data) || data.length === 0) {
                            listaHistorico.innerHTML = "<p>Você ainda não possui reservas.</p>";
                            return;
                        }

                        data.forEach(reserva => {
                            const cardHTML = `
                                <div class="historico-card">
                                    <img src="../imagens/${reserva.imagem_path || 'padrao.png'}" alt="${reserva.modelo}">
                                    <div class="historico-detalhes">
                                        <p><strong>Modelo:</strong> ${reserva.marca} ${reserva.modelo}</p>
                                        <p><strong>Ano:</strong> ${reserva.ano}</p>
                                        <p><strong>Data da Retirada:</strong> ${reserva.data_retirada}</p>
                                        <p><strong>Data da Devolução:</strong> ${reserva.data_devolucao}</p>
                                        <p><strong>Valor do Aluguel:</strong> R$ ${parseFloat(reserva.valor_aluguel).toFixed(2).replace(".", ",")}</p>
                                        <p><strong>Seguro:</strong> R$ ${parseFloat(reserva.valor_seguro).toFixed(2).replace(".", ",")}</p>
                                    </div>
                                </div>
                            `;
                            listaHistorico.insertAdjacentHTML('beforeend', cardHTML);
                        });

                    } catch (e) {
                        console.error("Erro ao processar JSON:", e);
                        listaHistorico.innerHTML = `<p style="color: red; font-weight: bold;">Erro ao processar dados do servidor.</p>`;
                    }
                } else if (xhr.status === 401) {
                    alert("Você precisa estar logado para ver seu histórico.");
                    window.location.href = "../html/login.html";
                } else {
                    listaHistorico.innerHTML = `<p style="color: red; font-weight: bold;">Erro interno no servidor (Status: ${xhr.status}).</p>`;
                }
            }
        };

        xhr.onerror = function() {
            listaHistorico.innerHTML = `<p style="color: red; font-weight: bold;">Falha de conexão com o servidor.</p>`;
        };

        xhr.send();
    };

    carregarHistorico();
});