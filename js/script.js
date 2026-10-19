const servicos = [
    {
        nome: "Teste de Perfil Tecnológico",
        descricao: "Descubra quais áreas da Tecnologia mais combinam com seus interesses, habilidades e preferências.",
        link: "testeperfil.html",
        categoria: "perfil",
        textoLink: "Iniciar Teste"
    },

    {
        nome: "Guia de Carreiras em Tecnologia",
        descricao: "Conheça diferentes carreiras na área de Tecnologia, suas principais funções, mercado de Trabalho, salários e perspectivas profissionais.",
        link: "guiacarreira.html",
        categoria: "carreiras",
        textoLink: "Explorar Carreiras"
    },

    {
        nome: "Cursos e Trilhas de Aprendizagem",
        descricao: "Receba recomendações de cursos e trilhas de aprendizagem para desenvolver suas habilidades em Tecnologia",
        link: "cursotrilha.html",
        categoria: "aprendizagem",
        textoLink: "Ver Cursos e Trilhas"
    }
];

const listaServicos = document.querySelector("#listaServicos");

function renderizarServicos(lista) {
    if (!listaServicos) {
        return;
    }

    // Limpa os cards anteriores.
    listaServicos.innerHTML = "";

    // Trata uma lista vazia.
    if (lista.length === 0) {
        const aviso = document.createElement("div");
        aviso.classList.add("mensagem-vazia");
        aviso.setAttribute("role", "status");

        const tituloAviso = document.createElement("h3");
        tituloAviso.textContent = "Nenhum serviço encontrado";

        const descricaoAviso = document.createElement("p");
        descricaoAviso.textContent = "Ainda não temos serviços nesta categoria. Selecione outra categoria para explorar as opções disponíveis.";

        aviso.append(tituloAviso, descricaoAviso);
        listaServicos.appendChild(aviso);
        return;
    }

    // Cria os cards dos serviços recebidos.
    lista.forEach((servico) => {
        const card = document.createElement("article");
        card.classList.add("card-servico");

        const titulo = document.createElement("h3");
        titulo.textContent = servico.nome;

        const descricao = document.createElement("p");
        descricao.textContent = servico.descricao;

        const link = document.createElement("a");
        link.classList.add("orientacao");
        link.href = servico.link;
        link.textContent = servico.textoLink;

        card.append(titulo, descricao, link);
        listaServicos.appendChild(card);
    });
}

const filtroCategoria =
    document.querySelector("#filtroCategoria");

const mensagemFiltro =
    document.querySelector("#mensagemFiltro");

const filtroPersonalizado = document.querySelector("#filtroPersonalizado");
const botaoFiltroCategoria = document.querySelector("#botaoFiltroCategoria");
const textoFiltroSelecionado = document.querySelector("#textoFiltroSelecionado");
const opcoesFiltroCategoria = document.querySelector("#opcoesFiltroCategoria");
const opcoesFiltro = Array.from(document.querySelectorAll(".filtro-opcao"));

function abrirFiltro() {
    opcoesFiltroCategoria.hidden = false;
    botaoFiltroCategoria.setAttribute("aria-expanded", "true");

    const opcaoAtual = opcoesFiltro.find(
        (opcao) => opcao.dataset.value === filtroCategoria.value
    );

    (opcaoAtual || opcoesFiltro[0]).focus();
}

function fecharFiltro({ devolverFoco = false } = {}) {
    opcoesFiltroCategoria.hidden = true;
    botaoFiltroCategoria.setAttribute("aria-expanded", "false");

    if (devolverFoco) {
        botaoFiltroCategoria.focus();
    }
}

function selecionarOpcao(opcao) {
    if (!opcao) return;

    filtroCategoria.value = opcao.dataset.value;
    textoFiltroSelecionado.textContent = opcao.querySelector("span").textContent;

    opcoesFiltro.forEach((item) => {
        const selecionada = item === opcao;
        item.classList.toggle("selecionada", selecionada);
        item.setAttribute("aria-selected", String(selecionada));
    });

    filtroCategoria.dispatchEvent(new Event("change", { bubbles: true }));
    fecharFiltro({ devolverFoco: true });
}

function filtrarServicos() {
    const categoriaEscolhida = filtroCategoria.value;

    // Se a opção "Todos os serviços" estiver selecionado.
    if (categoriaEscolhida === "todos") {
        renderizarServicos(servicos);

        mensagemFiltro.textContent = "";

        return;
    }

    // Seleciona somente os serviços da categoria escolhida.
    const servicosFiltrados = servicos.filter((servico) => {
        return servico.categoria === categoriaEscolhida;
    });

    // Atualiza os cards e a mensagem.
    renderizarServicos(servicosFiltrados);

    mensagemFiltro.textContent =
        servicosFiltrados.length +
        " serviço encontrado";
        //" serviço(s) encontrado(s).";

    if (servicosFiltrados.length == 0) {
        mensagemFiltro.textContent =
        servicosFiltrados.length +
        " serviços encontrados";
    }
}

// Inicializa o catálogo e registra o filtro uma única vez.
document.addEventListener("DOMContentLoaded", () => {
    renderizarServicos(servicos);

    if (filtroCategoria) {
        filtroCategoria.addEventListener("change", filtrarServicos);
    }

    if (filtroPersonalizado && botaoFiltroCategoria && opcoesFiltroCategoria) {
        botaoFiltroCategoria.addEventListener("click", () => {
            const estaAberto = botaoFiltroCategoria.getAttribute("aria-expanded") === "true";

            if (estaAberto) {
                fecharFiltro();
            } else {
                abrirFiltro();
            }
        });

        opcoesFiltro.forEach((opcao, indice) => {
            opcao.addEventListener("click", () => selecionarOpcao(opcao));

            opcao.addEventListener("keydown", (evento) => {
                let novoIndice = indice;

                if (evento.key === "ArrowDown") {
                    novoIndice = (indice + 1) % opcoesFiltro.length;
                } else if (evento.key === "ArrowUp") {
                    novoIndice = (indice - 1 + opcoesFiltro.length) % opcoesFiltro.length;
                } else if (evento.key === "Home") {
                    novoIndice = 0;
                } else if (evento.key === "End") {
                    novoIndice = opcoesFiltro.length - 1;
                } else if (evento.key === "Escape") {
                    evento.preventDefault();
                    fecharFiltro({ devolverFoco: true });
                    return;
                } else if (evento.key === "Tab") {
                    fecharFiltro();
                    return;
                } else if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    selecionarOpcao(opcao);
                    return;
                } else {
                    return;
                }

                evento.preventDefault();
                opcoesFiltro[novoIndice].focus();
            });
        });

        document.addEventListener("click", (evento) => {
            if (!filtroPersonalizado.contains(evento.target)) {
                fecharFiltro();
            }
        });

        document.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape" &&
                botaoFiltroCategoria.getAttribute("aria-expanded") === "true") {
                fecharFiltro({ devolverFoco: true });
            }
        });
    }

    if (mensagemFiltro) {
        mensagemFiltro.textContent = "";
    }
});

console.table(servicos);

console.log(servicos[0].nome);
console.log(servicos[1].categoria);

servicos.forEach((servico) => {
    console.log(servico.nome);
});

function mostrarResultado() {

    let pontos = 0;

    const pergunta1 = document.querySelector('input[name="pergunta1"]:checked');
    const pergunta2 = document.querySelector('input[name="pergunta2"]:checked');
    const pergunta3 = document.querySelector('input[name="pergunta3"]:checked');

    if (!pergunta1 || !pergunta2 || !pergunta3) {
        alert("Responda todas as perguntas antes de ver o resultado.");
        return;
    }

    if (pergunta1.value === "sim") {
        pontos++;
    }

    if (pergunta2.value === "sim") {
        pontos++;
    }

    if (pergunta3.value === "sim") {
        pontos++;
    }

    const textoResultado = document.getElementById("textoResultado");
    const janelaResultado = document.getElementById("resultado");

    if (pontos >= 2) {
        textoResultado.textContent = "Seu perfil demonstra interesse por programação, criação de sites e resolução de problemas. A área de Programação pode ser uma opção para você explorar.";
    } else {
        textoResultado.textContent = "Você pode conhecer outras áreas da Tecnologia e descobrir quais atividades mais combinam com seus interesses.";
    }

    janelaResultado.classList.add("ativo");

    document.activeElement.blur();
}