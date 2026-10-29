const containerListaFavoritos = document.querySelector("#listaServicos");
const popupFavorito = document.querySelector("#popupFavorito");
const textoPopupFavorito = document.querySelector("#textoPopupFavorito");
const botaoFecharPopupFavorito = document.querySelector("#fecharPopupFavorito");
const CHAVE_FAVORITO = "servicoFavorito";

function mostrarPopupFavorito(texto) {
    textoPopupFavorito.textContent = texto;
    popupFavorito.classList.add("ativo");
    popupFavorito.setAttribute("aria-hidden", "false");
    botaoFecharPopupFavorito.focus();
}

function fecharPopupFavorito() {
    popupFavorito.classList.remove("ativo");
    popupFavorito.setAttribute("aria-hidden", "true");
}

// Função global para atualizar também depois que o filtro recria os cards.
function atualizarEstrelas(favoritoAtual) {
    const botoes = containerListaFavoritos.querySelectorAll(".botao-favorito");

    botoes.forEach((botao) => {
        const nomeServico = botao.dataset.favorito;
        const selecionado = nomeServico === favoritoAtual;
        const estrela = botao.querySelector(".estrela");

        botao.classList.toggle("selecionado", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
        botao.setAttribute(
            "aria-label",
            selecionado
                ? `Remover ${nomeServico} dos favoritos`
                : `Marcar ${nomeServico} como favorito`
        );
        botao.title = selecionado ? "Remover dos favoritos" : "Marcar como favorito";

        if (estrela) {
            estrela.textContent = selecionado ? "★" : "☆";
        }
    });
}
window.atualizarEstrelas = atualizarEstrelas;

// Delegação: continua funcionando mesmo quando o filtro recria os cards.
containerListaFavoritos.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".botao-favorito");
    if (!botao || !containerListaFavoritos.contains(botao)) return;

    const nomeServico = botao.dataset.favorito;
    const favoritoAtual = localStorage.getItem(CHAVE_FAVORITO);

    if (favoritoAtual === nomeServico) {
        localStorage.removeItem(CHAVE_FAVORITO);
        atualizarEstrelas(null);
        mostrarPopupFavorito(`${nomeServico} foi removido dos seus favoritos.`);
        return;
    }

    localStorage.setItem(CHAVE_FAVORITO, nomeServico);
    atualizarEstrelas(nomeServico);
    mostrarPopupFavorito(`${nomeServico} agora é o seu serviço favorito!`);
});

botaoFecharPopupFavorito.addEventListener("click", fecharPopupFavorito);

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && popupFavorito.classList.contains("ativo")) {
        fecharPopupFavorito();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const salvo = localStorage.getItem(CHAVE_FAVORITO);
    const existe = Array.from(containerListaFavoritos.querySelectorAll(".botao-favorito"))
        .some((botao) => botao.dataset.favorito === salvo);

    if (salvo && !existe) localStorage.removeItem(CHAVE_FAVORITO);
    atualizarEstrelas(existe ? salvo : null);
});
