const formulario = document.querySelector("#formContato");
const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoAssunto = document.querySelector("#assunto");
const campoMensagem = document.querySelector("#mensagem");
const mensagem = document.querySelector("#mensagemForm");
const popup = document.querySelector("#popupValidacao");
const textoPopup = document.querySelector("#textoPopup");
const iconePopup = document.querySelector("#iconePopup");
const botaoFecharPopup = document.querySelector("#fecharPopup");

let envioBemSucedido = false;

function mostrarPopup(texto, sucesso = false) {
    textoPopup.textContent = texto;

    if (sucesso) {
        iconePopup.textContent = "✓";
        iconePopup.classList.add("sucesso");
    } else {
        iconePopup.textContent = "✕";
        iconePopup.classList.remove("sucesso");
    }

    envioBemSucedido = sucesso;

    popup.classList.add("ativo");
    popup.setAttribute("aria-hidden", "false");

    botaoFecharPopup.focus();
}

function fecharPopup() {
    popup.classList.remove("ativo");
    popup.setAttribute("aria-hidden", "true");

    if (envioBemSucedido) {
        formulario.reset();

        mensagem.textContent = "";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        envioBemSucedido = false;
    }
}

formulario.addEventListener("invalid", (evento) => {
    evento.preventDefault();

    const campo = evento.target;
    let texto = "Verifique os dados informados antes de continuar.";

    if (campo.id === "email") {
        if (campo.validity.valueMissing) {
            texto = "Por favor, informe seu endereço de e-mail.";
        } else if (campo.validity.typeMismatch) {
            texto = "O e-mail informado é inválido. Digite um endereço no formato exemplo@dominio.com.";
        } else {
            texto = "Verifique o endereço de e-mail informado.";
        }
    } else if (campo.validity.valueMissing) {
        texto = "Preencha o campo obrigatório antes de continuar.";
    }

    mostrarPopup(texto);
}, true);

botaoFecharPopup.addEventListener("click", fecharPopup);

document.addEventListener("keydown", (evento) => {
    if (
        evento.key === "Escape" &&
        popup.classList.contains("ativo")
    ) {
        fecharPopup();
    }
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const assunto = campoAssunto.value.trim();
    const textoMensagem = campoMensagem.value.trim();

    if (
        nome === "" ||
        email === "" ||
        assunto === "" ||
        textoMensagem === ""
    ) {
        mostrarPopup(
            "Preencha os campos obrigatórios antes de continuar."
        );
        return;
    }

    const primeiroNome = nome.split(" ")[0];

    mostrarPopup(
        `Obrigado, ${primeiroNome}! Sua solicitação foi registrada.`,
        true
    );
});