// Função para verificar o CPF
function verificarCpf() {
    const cpfInput = document.getElementById("cpf").value.trim(); // Obtém o CPF digitado
    const cpfsVotantes = JSON.parse(localStorage.getItem("cpfsVotantes")) || []; // Carrega os CPFs armazenados

    // Validação básica do CPF (11 dígitos numéricos)
    if (!cpfInput || cpfInput.length !== 11 || isNaN(cpfInput)) {
        alert("CPF inválido! Digite um CPF válido com 11 dígitos.");
        return;
    }

    if (cpfsVotantes.includes(cpfInput)) {
        // CPF já votou, redireciona para index2.html
        alert("Você já votou!");
        window.location.href = "index2.html";
    } else {
        // CPF não votou, registra e redireciona para index3.html
        cpfsVotantes.push(cpfInput);
        localStorage.setItem("cpfsVotantes", JSON.stringify(cpfsVotantes));
        alert("Acesso liberado para votação!");
        window.location.href = "index3.html";
    }
}






// Variáveis globais
let voto = ""; // Armazena os números digitados

// Função para registrar os números digitados
function clicou(numero) {
    const campo1 = document.getElementById("campo1");
    const campo2 = document.getElementById("campo2");

    // Preenche os campos de texto
    if (!campo1.value) {
        campo1.value = numero;
    } else if (!campo2.value) {
        campo2.value = numero;
        voto = campo1.value + campo2.value; // Monta o número do voto
    }

    // Reproduz o som de numeração
    const somNumeracao = document.getElementById("som-numeracao");
    somNumeracao.play();
}

// Função para votar branco
function votarBranco() {
    limparCampos();
    voto = "branco";
    alert("Voto em branco registrado.");
}

// Função para corrigir os campos
function corrige() {
    limparCampos();
    const somCorrecao = document.getElementById("som-correcao");
    somCorrecao.play();
}

// Função para limpar os campos de entrada
function limparCampos() {
    document.getElementById("campo1").value = "";
    document.getElementById("campo2").value = "";
    voto = "";
}


// Função para confirmar o voto
function confirma() {
    if (voto) {
        let candidatoValido = false;

        // Verifica se o número digitado corresponde a um candidato
        if (voto === "48" || voto === "12") {
            candidatoValido = true;
        }

        if (candidatoValido) {
            const somConfirmacao = document.getElementById("som-confirmacao");
            somConfirmacao.currentTime = 0; 
            somConfirmacao.play();

            somConfirmacao.addEventListener("ended", () => {
                window.location.href = "index1.html";
            });
        } else {
            alert("Número inválido! Digite novamente.");
        }
    } else {
        alert("Digite um número ou escolha BRANCO.");
    }
}
