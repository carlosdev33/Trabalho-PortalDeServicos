const campoTecnologia = document.querySelector("#tecnologia");
const formularioProjetos = document.querySelector("#formProjetos");
const botaoBuscarProjetos = document.querySelector("#btnBuscarProjetos");
const statusProjetos = document.querySelector("#statusProjetos");
const resultadoProjetos = document.querySelector("#resultadoProjetos");
const secaoProjetos = document.querySelector("#explorarProjetos");

const LIMITE_ANALISE = 30;
const LIMITE_EXIBICAO = 6;

const MENSAGENS = {
    consultando: "Consultando projetos...",
    encontrados: "Projetos encontrados",
    nenhum: "Nenhum projeto encontrado",
    erro: "Erro na consulta à API.",
    limite: "Limite de requisições atingido. Aguarde alguns instantes e tente novamente."
};

// Linguagens aceitas e abreviações conhecidas.
const linguagensProgramacao = {
    python: "Python", py: "Python",
    javascript: "JavaScript", js: "JavaScript",
    typescript: "TypeScript", ts: "TypeScript",
    java: "Java", php: "PHP",
    "c#": "C#", csharp: "C#",
    "c++": "C++", cpp: "C++", c: "C",
    ruby: "Ruby", go: "Go", golang: "Go",
    rust: "Rust", kotlin: "Kotlin", swift: "Swift"
};

let buscaAtual = null;

function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}

function normalizarLinguagemInformada(valor) {
    return valor.trim().toLowerCase().replace(/\s+/g, " ")
        .replace(/^c\s*sharp$/, "c#")
        .replace(/^c\s*plus\s*plus$/, "c++")
        .replace(/^c\s*\+\+$/, "c++")
        .replace(/^c\s*#$/, "c#");
}

function mensagemLinguagemInvalida(texto) {
    if (!texto) return "Informe uma linguagem de programação para pesquisar.";
    return "Linguagem não suportada. Use Python, JavaScript, TypeScript, Java, PHP, C, C++, C#, Ruby, Go, Rust, Kotlin ou Swift. Abreviações como JS e TS também são aceitas.";
}

function definirStatus(texto, tipo) {
    statusProjetos.textContent = texto;
    statusProjetos.classList.toggle("erro", tipo === "erro");
}

function limparResultados() {
    resultadoProjetos.replaceChildren();
}

function urlDoRepositorio(url) {
    try {
        const endereco = new URL(url);
        return endereco.protocol === "https:" && endereco.hostname === "github.com" ? endereco.href : "";
    } catch (erro) {
        return "";
    }
}

/*
 * Cria uma apresentação curta em português usando o nome, os tópicos e a
 * descrição fornecidos pelo GitHub. Alguns repositórios conhecidos possuem
 * resumos específicos; os demais passam por regras temáticas em português.
 */
function gerarDescricaoPortugues(projeto) {
    const nome = normalizarTexto(projeto.name);
    const texto = normalizarTexto([projeto.name, projeto.description, ...(projeto.topics || [])].join(" "));

    const descricoesConhecidas = {
        "public apis": "Catálogo colaborativo de APIs gratuitas, organizado por categorias. Ajuda desenvolvedores a encontrar serviços e fontes de dados para integrar a aplicações.",
        "javascript algorithms": "Coleção de algoritmos e estruturas de dados implementados em JavaScript, acompanhados de explicações e referências para apoiar o estudo e a prática de programação."
    };

    if (descricoesConhecidas[nome]) return descricoesConhecidas[nome];

    const regras = [
        { termos: ["algorithm", "algorithms", "data structure", "data structures"], texto: "Reúne implementações de algoritmos e estruturas de dados, com exemplos que ajudam a compreender técnicas de resolução de problemas e lógica de programação." },
        { termos: ["api", "apis", "rest api", "graphql"], texto: "Projeto relacionado à criação, integração ou consulta de APIs, permitindo que aplicações troquem informações e utilizem funcionalidades de outros serviços." },
        { termos: ["machine learning", "deep learning", "neural network", "artificial intelligence", " ai "], texto: "Projeto voltado à inteligência artificial e ao aprendizado de máquina, com recursos ou exemplos para desenvolver sistemas capazes de identificar padrões e realizar tarefas automatizadas." },
        { termos: ["web framework", "framework", "frontend", "front end", "backend", "back end"], texto: "Ferramenta de desenvolvimento que reúne recursos e componentes para facilitar a criação e a organização de aplicações e sistemas." },
        { termos: ["tutorial", "learn", "learning", "course", "exercises", "examples"], texto: "Material de aprendizagem com exemplos e exercícios de programação, desenvolvido para ajudar no estudo de conceitos e na prática da linguagem." },
        { termos: ["library", "biblioteca", "component", "components"], texto: "Biblioteca de programação que oferece funções e componentes reutilizáveis para simplificar o desenvolvimento de aplicações." },
        { termos: ["template", "boilerplate", "starter", "scaffold"], texto: "Modelo inicial de projeto com uma estrutura preparada para acelerar a criação e a configuração de novas aplicações." },
        { termos: ["tool", "tools", "cli", "command line", "automation", "automate"], texto: "Ferramenta de desenvolvimento que automatiza tarefas e facilita atividades comuns durante a criação, configuração ou manutenção de software." },
        { termos: ["game", "games", "jogo", "jogos"], texto: "Projeto de desenvolvimento de jogos, reunindo código e recursos utilizados para implementar mecânicas, interação e funcionalidades de jogo." },
        { termos: ["portfolio", "website", "web site", "landing page"], texto: "Projeto de desenvolvimento de uma página ou site, com estrutura e recursos para apresentar informações e conteúdo na Web." },
        { termos: ["database", "sql", "db", "data"], texto: "Projeto relacionado ao armazenamento, à organização ou ao processamento de dados, podendo apoiar consultas e integração com aplicações." },
        { termos: ["bot", "chatbot", "discord bot", "telegram bot"], texto: "Aplicação automatizada que interage com usuários ou serviços, executando comandos e oferecendo respostas e funcionalidades específicas." },
        { termos: ["security", " cybersecurity", "encryption", "cryptography"], texto: "Projeto voltado à segurança da informação, com recursos ou exemplos para proteger dados, aplicações e comunicações digitais." },
        { termos: ["mobile", "android", "ios", "react native", "flutter"], texto: "Projeto voltado ao desenvolvimento de aplicações para dispositivos móveis, reunindo código e recursos para criar funcionalidades em celulares e tablets." }
    ];

    for (const regra of regras) {
        if (regra.termos.some((termo) => texto.includes(normalizarTexto(termo)))) return regra.texto;
    }

    const linguagem = projeto.language ? ` utilizando ${projeto.language}` : "";
    const nomeExibicao = projeto.name ? `“${projeto.name}”` : "este repositório";
    return `Repositório ${nomeExibicao}${linguagem}, disponibilizado no GitHub. Reúne código-fonte e materiais do projeto; acesse a página para conhecer seus recursos e aplicações.`;
}

function criarLinha(termo, valor) {
    const linha = document.createElement("div");
    const rotulo = document.createElement("dt");
    const dado = document.createElement("dd");
    rotulo.textContent = termo;
    dado.textContent = valor;
    linha.append(rotulo, dado);
    return linha;
}

function criarCardProjeto(projeto) {
    const card = document.createElement("article");
    card.className = "card-projeto";

    const titulo = document.createElement("h3");
    titulo.textContent = projeto.name || "Repositório sem nome";

    const descricao = document.createElement("p");
    descricao.className = "descricao-projeto";
    descricao.textContent = gerarDescricaoPortugues(projeto);

    const detalhes = document.createElement("dl");
    detalhes.append(
        criarLinha("Proprietário", projeto.owner && projeto.owner.login ? projeto.owner.login : "Não informado"),
        criarLinha("Linguagem", projeto.language || "Não informada")
    );

    const linhaEstrelas = document.createElement("div");
    const rotuloEstrelas = document.createElement("dt");
    const valorEstrelas = document.createElement("dd");
    const iconeEstrela = document.createElement("span");
    rotuloEstrelas.textContent = "Estrelas";
    iconeEstrela.className = "icone-estrela-projeto";
    iconeEstrela.setAttribute("aria-hidden", "true");
    iconeEstrela.textContent = "★";
    valorEstrelas.append(iconeEstrela, document.createTextNode(Number(projeto.stargazers_count || 0).toLocaleString("pt-BR")));
    linhaEstrelas.append(rotuloEstrelas, valorEstrelas);
    detalhes.appendChild(linhaEstrelas);

    card.append(titulo, descricao, detalhes);

    const endereco = urlDoRepositorio(projeto.html_url);
    if (endereco) {
        const link = document.createElement("a");
        link.href = endereco;
        link.textContent = "Acessar projeto no GitHub";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);
    }
    return card;
}

function apresentarProjetos(projetos) {
    limparResultados();
    const fragmento = document.createDocumentFragment();
    projetos.forEach((projeto) => fragmento.appendChild(criarCardProjeto(projeto)));
    resultadoProjetos.appendChild(fragmento);
}

async function lerCorpo(resposta) {
    try { return await resposta.json(); } catch (erro) { return {}; }
}

function respostaIndicaLimite(resposta, corpo) {
    const mensagem = corpo && corpo.message ? corpo.message : "";
    return resposta.status === 429 || /rate limit/i.test(mensagem) || (!resposta.ok && resposta.headers.get("x-ratelimit-remaining") === "0");
}

async function buscarProjetos(evento) {
    if (evento) evento.preventDefault();
    if (!campoTecnologia || !statusProjetos || !resultadoProjetos) return;

    const textoInformado = campoTecnologia.value;
    const linguagem = linguagensProgramacao[normalizarLinguagemInformada(textoInformado)];
    if (!linguagem) {
        definirStatus(mensagemLinguagemInvalida(textoInformado.trim()), "erro");
        limparResultados();
        campoTecnologia.setAttribute("aria-invalid", "true");
        campoTecnologia.focus();
        return;
    }

    campoTecnologia.removeAttribute("aria-invalid");
    if (buscaAtual) buscaAtual.abort();
    const controle = new AbortController();
    buscaAtual = controle;

    botaoBuscarProjetos.disabled = true;
    secaoProjetos.setAttribute("aria-busy", "true");
    definirStatus(MENSAGENS.consultando, "info");
    limparResultados();

    try {
        const consulta = 'language:"' + linguagem + '"';
        const url = "https://api.github.com/search/repositories?q=" + encodeURIComponent(consulta) +
            "&sort=stars&order=desc&per_page=" + LIMITE_ANALISE;
        const resposta = await fetch(url, {
            signal: controle.signal,
            headers: { Accept: "application/vnd.github+json" }
        });
        const dados = await lerCorpo(resposta);

        if (respostaIndicaLimite(resposta, dados)) {
            definirStatus(MENSAGENS.limite, "erro");
            return;
        }
        if (!resposta.ok || !Array.isArray(dados.items)) {
            definirStatus(MENSAGENS.erro, "erro");
            return;
        }

        const projetosFiltrados = dados.items.filter((projeto) => projeto.language && projeto.language.toLowerCase() === linguagem.toLowerCase());
        if (projetosFiltrados.length === 0) {
            definirStatus(MENSAGENS.nenhum, "info");
            return;
        }

        apresentarProjetos(projetosFiltrados.slice(0, LIMITE_EXIBICAO));
        definirStatus(MENSAGENS.encontrados, "info");
    } catch (erro) {
        if (erro.name === "AbortError") return;
        definirStatus(MENSAGENS.erro, "erro");
    } finally {
        if (buscaAtual === controle) {
            botaoBuscarProjetos.disabled = false;
            secaoProjetos.removeAttribute("aria-busy");
            buscaAtual = null;
        }
    }
}

if (formularioProjetos) formularioProjetos.addEventListener("submit", buscarProjetos);

// Janela de ajuda das linguagens aceitas.
const popupLinguagens = document.querySelector("#popupLinguagens");
const abrirAjudaLinguagens = document.querySelector("#abrirAjudaLinguagens");
const fecharAjudaLinguagens = document.querySelector("#fecharAjudaLinguagens");
const entendiAjudaLinguagens = document.querySelector("#entendiAjudaLinguagens");

function abrirPopupLinguagens() {
    if (!popupLinguagens) return;
    popupLinguagens.classList.add("ativo");
    popupLinguagens.setAttribute("aria-hidden", "false");
    entendiAjudaLinguagens?.focus();
}
function fecharPopupLinguagens() {
    if (!popupLinguagens) return;
    popupLinguagens.classList.remove("ativo");
    popupLinguagens.setAttribute("aria-hidden", "true");
    abrirAjudaLinguagens?.focus();
}
abrirAjudaLinguagens?.addEventListener("click", abrirPopupLinguagens);
fecharAjudaLinguagens?.addEventListener("click", fecharPopupLinguagens);
entendiAjudaLinguagens?.addEventListener("click", fecharPopupLinguagens);
popupLinguagens?.addEventListener("click", (evento) => {
    if (evento.target === popupLinguagens) fecharPopupLinguagens();
});
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && popupLinguagens?.classList.contains("ativo")) fecharPopupLinguagens();
});
