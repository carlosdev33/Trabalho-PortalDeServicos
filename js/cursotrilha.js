/* Cursos e Trilhas de Aprendizagem */

/* Dados dos Cursos */

const cursos = [
    {
        codigo: "htmlcss",
        titulo: "HTML5 [40 Horas]",
        plataforma: "Curso em Vídeo",
        area: "web",
        nivel: "Iniciante",
        duracao: "40 horas",
        icone: "🌐",
        descricao: "Curso gratuito para aprender os fundamentos do desenvolvimento Web, criando páginas e sites do zero.",
        conteudo: "HTML5, CSS3, JavaScript, estrutura de páginas, imagens, links, tabelas, formulários e introdução ao desenvolvimento Web.",
        link: "https://www.cursoemvideo.com/curso/html5/"
    },

    {
        codigo: "javascript",
        titulo: "Javascript [40 Horas]",
        plataforma: "Curso em Vídeo",
        area: "web",
        nivel: "Intermediário",
        duracao: "40 horas",
        icone: "💻",
        descricao: "Curso gratuito para aprender JavaScript e desenvolver páginas Web mais interativas e dinâmicas.",
        conteudo: "Fundamentos de JavaScript, variáveis, condições, estruturas de repetição, funções, eventos e recursos da linguagem.",
        link: "https://www.cursoemvideo.com/curso/javascript/"
    },

    {
        codigo: "flutter",
        titulo: "Santander Bootcamp | Mobile Developer",
        plataforma: "DIO",
        area: "mobile",
        nivel: "Intermediário",
        duracao: "107 horas",
        icone: "📱",
        descricao: "Bootcamp gratuito voltado ao desenvolvimento de aplicativos Mobile e às práticas utilizadas no mercado.",
        conteudo: "Desenvolvimento Mobile, criação de aplicações, boas práticas, projetos práticos e preparação para o mercado.",
        link: "https://www.dio.me/bootcamp/santander-mobile-developer"
    },

    {
        codigo: "dados",
        titulo: "Introdução à Análise de Dados - Microsoft Power BI",
        plataforma: "Fundação Bradesco",
        area: "dados",
        nivel: "Iniciante",
        duracao: "5 horas",
        icone: "📊",
        descricao: "Curso gratuito para conhecer os fundamentos da análise de dados e utilizar o Power BI.",
        conteudo: "Dados e informações, análise de dados, funções do analista, Power BI, relatórios e painéis.",
        link: "https://www.ev.org.br/cursos/introducao-a-analise-de-dados-microsoft-power-bi"
    },

    {
        codigo: "python",
        titulo: "Linguagem de Programação Python - Básico",
        plataforma: "Fundação Bradesco",
        area: "dados",
        nivel: "Iniciante",
        duracao: "18 horas",
        icone: "🐍",
        descricao: "Curso gratuito para aprender os fundamentos da linguagem Python e desenvolver programas básicos.",
        conteudo: "Raciocínio lógico, Python, variáveis, tipos de dados, estruturas lógicas, funções e outros recursos da linguagem.",
        link: "https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico"
    },

    {
        codigo: "ia",
        titulo: "FluêncIA em Inteligência Artificial",
        plataforma: "Fundação Bradesco",
        area: "ia",
        nivel: "Iniciante",
        duracao: "4 horas",
        icone: "🤖",
        descricao: "Curso gratuito para conhecer os fundamentos da Inteligência Artificial Generativa e suas aplicações.",
        conteudo: "História da IA, Inteligência Artificial Generativa, Copilot, produtividade, ética, prompts e criação de agentes.",
        link: "https://www.ev.org.br/cursos/fluencia"
    },

    {
        codigo: "machinelearning",
        titulo: "AI-900 - Fundamentos de IA no Azure",
        plataforma: "Fundação Bradesco",
        area: "ia",
        nivel: "Iniciante",
        duracao: "16 horas",
        icone: "🧠",
        descricao: "Curso gratuito para aprofundar os fundamentos de Inteligência Artificial no ecossistema Microsoft Azure.",
        conteudo: "Fundamentos de IA, serviços de Inteligência Artificial do Azure, aplicações Web e Mobile e preparação para a certificação AI-900.",
        link: "https://www.ev.org.br/cursos/AI900Azure"
    },

    {
        codigo: "seguranca",
        titulo: "Princípios da Cibersegurança",
        plataforma: "DIO",
        area: "seguranca",
        nivel: "Iniciante",
        duracao: "Online",
        icone: "🔐",
        descricao: "Curso gratuito introdutório para conhecer os principais conceitos de Cibersegurança e proteção digital.",
        conteudo: "Introdução ao mundo da Cibersegurança, segurança da informação, proteção online e questionário de aprendizagem.",
        link: "https://www.dio.me/courses/iniciando-no-mundo-da-ciberseguranca"
    },

    {
        codigo: "redes",
        titulo: "Riachuelo - Cibersegurança",
        plataforma: "DIO",
        area: "seguranca",
        nivel: "Intermediário",
        duracao: "Bootcamp",
        icone: "🛡️",
        descricao: "Bootcamp gratuito para desenvolver conhecimentos em proteção de sistemas, Linux, vulnerabilidades e Hacking Ético.",
        conteudo: "Linux, fundamentos de Cibersegurança, Hacking Ético, vulnerabilidades, proteção contra ataques e segurança de sistemas.",
        link: "https://www.dio.me/bootcamp/riachuelo-ciberseguranca"
    },
];

/* Dados das Trilhas */

const trilhas = {

    web: {
        titulo: "Trilha de Desenvolvimento Web",
        icone: "🌐",
        descricao: "Uma sequência de estudos para desenvolver conhecimentos desde os fundamentos até conceitos mais avançados de Desenvolvimento Web.",
        passos: [
            "HTML5 e CSS3",
            "JavaScript",
            "HTML5 e CSS3 avançado"
        ]
    },

    dados: {
        titulo: "Trilha de Dados e Inteligência Artificial",
        icone: "📊",
        descricao: "Uma sequência para desenvolver conhecimentos em programação, análise de dados e Inteligência Artificial.",
        passos: [
            "Python Básico",
            "Introdução à Análise de Dados",
            "Fundamentos de IA",
            "IA no Azure"
        ]
    },

    seguranca: {
        titulo: "Trilha de Cibersegurança",
        icone: "🔐",
        descricao: "Uma sequência de estudos para compreender os fundamentos de Cibersegurança e avançar para proteção de sistemas.",
        passos: [
            "Princípios da Cibersegurança",
            "Fundamentos de Cibersegurança",
            "Hacking Ético e proteção de sistemas"
        ]
    }
};

/* Elementos */

const cardsCursos = document.querySelectorAll(".card-curso");
const filtrosArea = document.querySelectorAll(".filtro-curso");
const filtrosNivel = document.querySelectorAll(".filtro-nivel");
const contadorCursos = document.getElementById("contadorCursos");
const semCursos = document.getElementById("semCursos");
const listaCursos = document.getElementById("listaCursos");

const modalCurso = document.getElementById("modalCurso");
const fecharModalCurso = document.getElementById("fecharModalCurso");
const modalTrilha = document.getElementById("modalTrilha");
const fecharModalTrilha = document.getElementById("fecharModalTrilha");
const botaoComecarCurso = document.getElementById("botaoComecarCurso");

/* Filtros atuais */

let areaAtual = "todas";
let nivelAtual = "todos";

/* Filtrar cursos */

function filtrarCursos() {

    let quantidade = 0;

    cardsCursos.forEach(card => {

        const area = card.dataset.area;
        const nivel = card.dataset.nivel;

        const correspondeArea =
            areaAtual === "todas" || area === areaAtual;

        const correspondeNivel =
            nivelAtual === "todos" || nivel === nivelAtual;

        if (correspondeArea && correspondeNivel) {
            card.style.display = "flex";
            quantidade++;
        } else {
            card.style.display = "none";
        }
    });

    atualizarContador(quantidade);
}

/* Atualizar contador */

function atualizarContador(quantidade) {

    if (quantidade === 0) {

        contadorCursos.textContent = "Nenhum curso encontrado";

        listaCursos.style.display = "none";

        semCursos.classList.add("ativo");

        return;
    }

    listaCursos.style.display = "grid";

    semCursos.classList.remove("ativo");

    contadorCursos.textContent =
        quantidade === 1
            ? "1 curso encontrado"
            : `${quantidade} cursos encontrados`;
}

/* Filtros de Área */

filtrosArea.forEach(filtro => {

    filtro.addEventListener("click", () => {

        filtrosArea.forEach(item => {
            item.classList.remove("ativo");
        });

        filtro.classList.add("ativo");
        areaAtual = filtro.dataset.filtroArea;

        filtrarCursos();
    });
});

/* Filtros de Nível */

filtrosNivel.forEach(filtro => {

    filtro.addEventListener("click", () => {

        filtrosNivel.forEach(item => {
            item.classList.remove("ativo");
        });

        filtro.classList.add("ativo");
        nivelAtual = filtro.dataset.filtroNivel;

        filtrarCursos();
    });
});

/* Modal do Curso */

function abrirCurso(codigoCurso) {

    const curso = cursos.find(item =>
        item.codigo === codigoCurso
    );

    if (!curso) {
        console.error("Curso não encontrado:", codigoCurso);
        return;
    }

    document.getElementById("modalIconeCurso").textContent = curso.icone;
    document.getElementById("modalCategoriaCurso").textContent = curso.plataforma;
    document.getElementById("modalTituloCurso").textContent = curso.titulo;
    document.getElementById("modalDescricaoCurso").textContent = curso.descricao;
    document.getElementById("modalNivelCurso").textContent = curso.nivel;
    document.getElementById("modalDuracaoCurso").textContent = curso.duracao;
    document.getElementById("modalModalidadeCurso").textContent = "Online e gratuito";
    document.getElementById("modalConteudoCurso").textContent = curso.conteudo;

    botaoComecarCurso.onclick = () => {
        window.open(curso.link, "_blank", "noopener,noreferrer");
    };

    modalCurso.classList.add("ativo");
    modalCurso.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

/* Botões dos cursos */

document.querySelectorAll(".botao-curso").forEach(botao => {

    botao.addEventListener("click", () => {
        abrirCurso(botao.dataset.curso);
    });
});

/* Modal de Trilha */

function abrirTrilha(codigoTrilha) {

    const trilha = trilhas[codigoTrilha];

    if (!trilha) {
        return;
    }

    document.getElementById("modalIconeTrilha").textContent = trilha.icone;
    document.getElementById("modalTituloTrilha").textContent = trilha.titulo;
    document.getElementById("modalDescricaoTrilha").textContent = trilha.descricao;

    const passos = document.getElementById("passosTrilha");
    passos.innerHTML = "";

    trilha.passos.forEach((passo, indice) => {

        const elemento = document.createElement("div");
        elemento.className = "passo-trilha";

        elemento.innerHTML = `
            <span class="numero-passo">
                ${indice + 1}
            </span>

            <span>
                ${passo}
            </span>
        `;

        passos.appendChild(elemento);
    });

    modalTrilha.classList.add("ativo");
    modalTrilha.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

/* Botões das trilhas */

document.querySelectorAll(".botao-trilha").forEach(botao => {

    botao.addEventListener("click", () => {
        abrirTrilha(botao.dataset.trilha);
    });
});

/* Fechar Modais */

function fecharModal(modal) {

    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");

    // Remove o foco do elemento que estava selecionado
    if (document.activeElement) {
        document.activeElement.blur();
    }

    if (
        !modalCurso.classList.contains("ativo") &&
        !modalTrilha.classList.contains("ativo")
    ) {
        document.body.style.overflow = "";
    }
}

/* Botões X */

fecharModalCurso.addEventListener("click", () => {
    fecharModal(modalCurso);
});

fecharModalTrilha.addEventListener("click", () => {
    fecharModal(modalTrilha);
});

/* Clique fora do conteúdo */

modalCurso.addEventListener("click", evento => {

    if (evento.target === modalCurso) {
        fecharModal(modalCurso);
    }
});

modalTrilha.addEventListener("click", evento => {

    if (evento.target === modalTrilha) {
        fecharModal(modalTrilha);
    }
});

/* Tecla ESC */

document.addEventListener("keydown", evento => {

    if (evento.key === "Escape") {

        if (modalCurso.classList.contains("ativo")) {
            fecharModal(modalCurso);
        }

        if (modalTrilha.classList.contains("ativo")) {
            fecharModal(modalTrilha);
        }
    }
});

/* Inicialização */

filtrarCursos();