/* Guia de Carreiras em Tecnologia */

/* Dados das Carreiras */

const carreiras = {
    web: {
        titulo: "Desenvolvimento Web",
        icone: "🌐",
        categoria: "Desenvolvimento",
        descricao: "Área responsável pela criação, manutenção e evolução de sites, sistemas e aplicações acessadas pela internet.",
        responsabilidades: "Criar interfaces, desenvolver funcionalidades, integrar sistemas, corrigir problemas e manter aplicações web.",
        mercado: "Possui oportunidades relacionadas ao desenvolvimento de sites, sistemas web, aplicações e serviços digitais.",
        salario: "Média de R$ 5.326 por mês, com valores entre R$ 3.322 e R$ 9.755, variando conforme experiência, especialização, região e empresa.",
        tendencias: "Aplicações web modernas, APIs, acessibilidade, experiência do usuário, desenvolvimento responsivo e integração com serviços digitais."
    },

    mobile: {
        titulo: "Desenvolvimento Mobile",
        icone: "📱",
        categoria: "Desenvolvimento",
        descricao: "Área voltada ao desenvolvimento de aplicativos e experiências digitais para dispositivos móveis.",
        responsabilidades: "Planejar, desenvolver, testar e atualizar aplicativos, além de integrar APIs e serviços externos.",
        mercado: "Abrange aplicativos para diferentes segmentos, como serviços, comércio, educação, entretenimento e negócios.",
        salario: "Média de R$ 6.029 por mês, com valores entre R$ 3.882 e R$ 11.923, variando conforme experiência, especialização, região e empresa.",
        tendencias: "Aplicativos multiplataforma, integração com serviços em nuvem, experiência do usuário e evolução das tecnologias móveis."
    },

    dados: {
        titulo: "Análise de Dados",
        icone: "📊",
        categoria: "Dados e IA",
        descricao: "Área que trabalha com coleta, organização, análise e interpretação de dados para transformar informações em conhecimento.",
        responsabilidades: "Organizar dados, realizar análises, criar relatórios e dashboards e identificar informações relevantes para decisões.",
        mercado: "Pode atuar em empresas que utilizam dados para acompanhar resultados, compreender comportamentos e apoiar decisões.",
        salario: "Na área de Dados, a média é de R$ 10.233 por mês, com valores entre R$ 3.323 e R$ 20.966, conforme experiência e especialização.",
        tendencias: "Automação de análises, visualização de dados, inteligência artificial, integração de dados e uso crescente de ferramentas analíticas."
    },

    ia: {
        titulo: "Inteligência Artificial",
        icone: "🤖",
        categoria: "Dados e IA",
        descricao: "Área dedicada ao desenvolvimento de soluções que utilizam algoritmos, modelos e dados para resolver problemas.",
        responsabilidades: "Preparar dados, desenvolver modelos, realizar testes, avaliar resultados e integrar soluções inteligentes a sistemas.",
        mercado: "Pode estar presente em empresas de tecnologia, serviços digitais, indústria, negócios e diferentes setores que utilizam dados.",
        salario: "Na área de Inteligência Artificial, os valores variam conforme a função e especialização. Engenheiros de Machine Learning têm média de R$ 11.875 por mês.",
        tendencias: "Modelos generativos, automação, aprendizado de máquina, processamento de linguagem e integração de IA em aplicações."
    },

    seguranca: {
        titulo: "Cyber Segurança",
        icone: "🔐",
        categoria: "Segurança",
        descricao: "Área dedicada à proteção de sistemas, redes, aplicações e informações contra ameaças e acessos não autorizados.",
        responsabilidades: "Monitorar ambientes, identificar riscos, implementar medidas de proteção e apoiar a prevenção e resposta a incidentes.",
        mercado: "Está relacionada à proteção de informações e sistemas em empresas, instituições e serviços digitais.",
        salario: "Média de R$ 9.021 por mês, com valores entre R$ 2.759 e R$ 16.292, variando conforme experiência, especialização, região e empresa.",
        tendencias: "Segurança em nuvem, proteção de aplicações, monitoramento, gestão de riscos e aumento da preocupação com proteção de dados."
    }
};


/* Elementos das Páginas */

const campoBusca =
    document.getElementById("buscaCarreira");

const filtros =
    document.querySelectorAll(".filtro");

const cards =
    document.querySelectorAll(".card-carreira");

const contador =
    document.getElementById("contadorCarreiras");

const semResultados =
    document.getElementById("semResultados");

const modal =
    document.getElementById("modalCarreira");

const fecharModal =
    document.getElementById("fecharModal");


/* Filtro Atual */

let filtroAtual = "todos";

/* Função para Filtrar Carreiras */

function filtrarCarreiras() {

    const termo =
        campoBusca.value
            .toLowerCase()
            .trim();

    let quantidade = 0;


    cards.forEach(card => {

        const categoria =
            card.dataset.categoria;

        const nome =
            card.dataset.nome.toLowerCase();


        const correspondeFiltro =
            filtroAtual === "todos" ||
            categoria === filtroAtual;


        const correspondeBusca =
            nome.includes(termo);


        if (
            correspondeFiltro &&
            correspondeBusca
        ) {

            card.style.display = "flex";

            quantidade++;

        } else {

            card.style.display = "none";

        }

    });


    atualizarContador(quantidade);

}

/* Atualiza o Contador */

function atualizarContador(quantidade) {

    if (quantidade === 0) {

        contador.textContent =
            "Nenhuma carreira encontrada";

        semResultados.classList.add("ativo");

    } else {

        contador.textContent =
            quantidade === 1
                ? "1 carreira encontrada"
                : `${quantidade} carreiras encontradas`;

        semResultados.classList.remove("ativo");

    }

}

/* Evento de Pesquisa */

campoBusca.addEventListener(
    "input",
    filtrarCarreiras
);

/* Eventos dos Filtros */

filtros.forEach(filtro => {

    filtro.addEventListener(
        "click",
        () => {

            filtros.forEach(item => {

                item.classList.remove("ativo");

            });


            filtro.classList.add("ativo");


            filtroAtual =
                filtro.dataset.filtro;


            filtrarCarreiras();

        }
    );

});

/* Função Abrir Modal */

function abrirModal(codigoCarreira) {

    const carreira =
        carreiras[codigoCarreira];


    if (!carreira) {
        return;
    }


    document.getElementById(
        "modalIcone"
    ).textContent = carreira.icone;


    document.getElementById(
        "modalCategoria"
    ).textContent = carreira.categoria;


    document.getElementById(
        "modalTitulo"
    ).textContent = carreira.titulo;


    document.getElementById(
        "modalDescricao"
    ).textContent = carreira.descricao;


    document.getElementById(
        "modalResponsabilidades"
    ).textContent = carreira.responsabilidades;


    document.getElementById(
        "modalMercado"
    ).textContent = carreira.mercado;


    document.getElementById(
        "modalSalario"
    ).textContent = carreira.salario;


    document.getElementById(
        "modalTendencias"
    ).textContent = carreira.tendencias;


    modal.classList.add("ativo");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow = "hidden";

}

/* Eventos dos Botões "Ver Carreira" */

document
    .querySelectorAll(".botao-detalhes")
    .forEach(botao => {

        botao.addEventListener(
            "click",
            () => {

                abrirModal(
                    botao.dataset.carreira
                );

            }
        );

    });

/* Fechar Modal */

function fecharJanela() {
    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Remove o foco do botão que abriu o Modal
    if (document.activeElement) {
        document.activeElement.blur();
    }
}

/* Botão X */

fecharModal.addEventListener(
    "click",
    fecharJanela
);


/* Clicar fora do conteúdo */

modal.addEventListener(
    "click",
    evento => {

        if (
            evento.target === modal
        ) {

            fecharJanela();

        }

    }
);

/* Tecla ESC */

document.addEventListener(
    "keydown",
    evento => {

        if (
            evento.key === "Escape" &&
            modal.classList.contains("ativo")
        ) {

            fecharJanela();

        }

    }
);

/* Inicialização */

filtrarCarreiras();