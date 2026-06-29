document.addEventListener("DOMContentLoaded", () => {
    
    const formFiltros = document.getElementById("form-filtros");
    const gridResultados = document.getElementById("resultados-veiculos");

    const modal = document.getElementById("modal-reserva");
    const modalPrincipal = document.getElementById("modal-conteudo-principal");
    const modalSucesso = document.getElementById("modal-conteudo-sucesso");
    const btnCancelar = document.getElementById("btn-cancelar-reserva");
    const btnConfirmar = document.getElementById("btn-confirmar-reserva");
    const btnFecharSucesso = document.getElementById("btn-fechar-sucesso");
    
    let precoAtualDiaria = 0;
    let veiculoIdAtual = 0;

    const buscarVeiculos = (parametrosURL = "") => {
        if (!gridResultados) return;
        
        gridResultados.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>Buscando veículos...</p>";
        const url = `../../backend/veiculos.php${parametrosURL}`;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const veiculos = JSON.parse(xhr.responseText);
                        gridResultados.innerHTML = ""; 

                        if (veiculos.length === 0) {
                            gridResultados.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>Nenhum veículo encontrado.</p>";
                            return; 
                        }

                        veiculos.forEach(carro => {
                            const cardHTML = `
                                <article class="car-card">
                                    <img src="../imagens/${carro.imagem_path || 'padrao.png'}" alt="${carro.modelo}">
                                    <h3>${carro.marca} ${carro.modelo}</h3>
                                    <p class="car-category">Tipo: ${carro.tipo || 'Não especificado'}</p>
                                    <p class="car-price">Diária: R$ ${parseFloat(carro.preco_diaria).toFixed(2)}</p>
                                    <button class="btn-reservar" 
                                        data-id="${carro.id}"
                                        data-modelo="${carro.marca} ${carro.modelo}" 
                                        data-ano="${carro.ano}" 
                                        data-preco="${carro.preco_diaria}" 
                                        data-img="../imagens/${carro.imagem_path || 'padrao.png'}"
                                        data-ar="${carro.ar_condicionado}"
                                        data-multimidia="${carro.multimidia}"
                                        data-assentos="${carro.num_assentos}">
                                        Reservar
                                    </button>
                                </article>
                            `;
                            gridResultados.insertAdjacentHTML('beforeend', cardHTML);
                        });
                    } catch (error) {
                        console.error(error);
                        gridResultados.innerHTML = "<p>Ocorreu um erro ao carregar os veículos.</p>";
                    }
                } else {
                    gridResultados.innerHTML = "<p>Ocorreu um erro ao carregar os veículos.</p>";
                }
            }
        };
        xhr.send();
    };

    if (gridResultados) buscarVeiculos();

    if (formFiltros) {
        formFiltros.addEventListener("submit", (evento) => {
            evento.preventDefault(); 
            const formData = new FormData(formFiltros);
            const parametros = new URLSearchParams(formData).toString();
            buscarVeiculos(`?${parametros}`);
        });
    }

    if (gridResultados) {
        gridResultados.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-reservar")) {
                const btn = e.target;
                
                const xhrAuth = new XMLHttpRequest();
                xhrAuth.open("GET", "../../backend/check_auth.php", true);
                xhrAuth.onreadystatechange = function () {
                    if (xhrAuth.readyState === 4) {
                        if (xhrAuth.status === 200) {
                            try {
                                const authData = JSON.parse(xhrAuth.responseText);
                                if (!authData.logado) { 
                                    alert("Você precisa estar logado para reservar um veículo!");
                                    window.location.href = "login.html";
                                    return;
                                }

                                veiculoIdAtual = btn.dataset.id;
                                
                                document.getElementById("modal-img-carro").src = btn.dataset.img;
                                document.getElementById("modal-modelo").textContent = btn.dataset.modelo;
                                document.getElementById("modal-ano").textContent = btn.dataset.ano;
                                
                                precoAtualDiaria = parseFloat(btn.dataset.preco);
                                document.getElementById("modal-diaria").textContent = precoAtualDiaria.toFixed(2);

                                const temAr = (btn.dataset.ar === "1" || btn.dataset.ar === "true" || btn.dataset.ar === 1);
                                const temMultimidia = (btn.dataset.multimidia === "1" || btn.dataset.multimidia === "true" || btn.dataset.multimidia === 1);

                                document.getElementById("modal-icone-ar").textContent = temAr ? "❄️ Com Ar" : "❄️ Sem Ar";
                                document.getElementById("modal-icone-multimidia").textContent = temMultimidia ? "📺 Multimídia" : "📺 Sem Multimídia";
                                document.getElementById("modal-icone-assentos").textContent = `👤 ${btn.dataset.assentos || 0} Lugares`;

                                document.getElementById("modal-icone-ar").style.display = "inline";
                                document.getElementById("modal-icone-multimidia").style.display = "inline";

                                document.getElementById("modal-dias").value = 1;
                                document.getElementById("modal-data-retirada").value = "";
                                document.getElementById("modal-motorista").checked = false;
                                calcularTotal();

                                modal.style.display = "flex";
                                modalPrincipal.style.display = "block";
                                modalSucesso.style.display = "none";

                            } catch (erro) {
                                console.error(erro);
                            }
                        } else {
                            console.error("Erro na verificação de autenticação");
                        }
                    }
                };
                xhrAuth.send();
            }
        });
    }

    const calcularTotal = () => {
        const dias = parseInt(document.getElementById("modal-dias").value) || 1;
        const querMotorista = document.getElementById("modal-motorista").checked;
        const precoSeguroDiario = 20.00; 

        let total = (precoAtualDiaria + precoSeguroDiario) * dias;
        if (querMotorista) total += 80.00; 

        document.getElementById("modal-valor-total").textContent = total.toFixed(2).replace(".", ",");
    };

    const inputDias = document.getElementById("modal-dias");
    const inputMotorista = document.getElementById("modal-motorista");
    
    if (inputDias) inputDias.addEventListener("input", calcularTotal);
    if (inputMotorista) inputMotorista.addEventListener("change", calcularTotal);

    const inputCartao = document.getElementById("pagamento-cartao");
    if (inputCartao) {
        inputCartao.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "");
            valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
            e.target.value = valor.substring(0, 19);
        });
    }

    const inputValidade = document.getElementById("pagamento-validade");
    if (inputValidade) {
        inputValidade.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "");
            if (valor.length > 2) {
                valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
            }
            e.target.value = valor;
        });
    }

    const resetarCamposPagamento = () => {
        document.getElementById("pagamento-nome").value = "";
        document.getElementById("pagamento-cartao").value = "";
        document.getElementById("pagamento-validade").value = "";
        document.getElementById("pagamento-cvv").value = "";
        document.getElementById("modal-data-retirada").value = "";
    };

    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", () => {
            const dataRetirada = document.getElementById("modal-data-retirada").value;
            const nome = document.getElementById("pagamento-nome").value.trim();
            const cartao = document.getElementById("pagamento-cartao").value.replace(/\s/g, "");
            const validade = document.getElementById("pagamento-validade").value.trim();
            const cvv = document.getElementById("pagamento-cvv").value.trim();
            const validadeRegex = /^\d{2}\/\d{2}$/;

            if (!dataRetirada) {
                alert("Por favor, selecione a Data de Retirada.");
                return;
            }

            if (nome === "" || cartao.length < 13 || cartao.length > 19 || isNaN(cartao) || !validadeRegex.test(validade) || cvv.length < 3 || isNaN(cvv)) {
                alert("Por favor, preencha os dados do cartão corretamente.\n- O número do cartão deve conter apenas números.\n- A validade deve estar no formato MM/AA.\n- O CVV deve ter 3 ou 4 dígitos.");
                return;
            }

            const dias = parseInt(document.getElementById("modal-dias").value) || 1;
            const querMotorista = document.getElementById("modal-motorista").checked;
            const valorSeguro = 20.00 * dias;
            let valorAluguel = (precoAtualDiaria * dias) + (querMotorista ? 80.00 : 0);

            btnConfirmar.disabled = true;
            btnConfirmar.textContent = "Aguarde...";

            const payload = JSON.stringify({
                veiculo_id: veiculoIdAtual,
                data_retirada: dataRetirada,
                dias: dias,
                valor_aluguel: valorAluguel,
                valor_seguro: valorSeguro
            });

            const xhrSalvar = new XMLHttpRequest();
            xhrSalvar.open("POST", "../../backend/salvar_reserva.php", true);
            xhrSalvar.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhrSalvar.onreadystatechange = function () {
                if (xhrSalvar.readyState === 4) {
                    btnConfirmar.disabled = false;
                    btnConfirmar.textContent = "Confirmar Reserva";

                    if (xhrSalvar.status === 200) {
                        modalPrincipal.style.display = "none";
                        modalSucesso.style.display = "block";
                    } else {
                        try {
                            const dadosRes = JSON.parse(xhrSalvar.responseText);
                            alert("Erro ao confirmar reserva: " + (dadosRes.erro || "Verifique os dados."));
                        } catch (erro) {
                            alert("Erro de conexão ao salvar a reserva.");
                        }
                    }
                }
            };
            xhrSalvar.send(payload);
        });
    }

    if (btnFecharSucesso) {
        btnFecharSucesso.addEventListener("click", () => {
            modal.style.display = "none";
            resetarCamposPagamento();
        });
    }

    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            modal.style.display = "none";
            resetarCamposPagamento();
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            resetarCamposPagamento();
        }
    });
});