const servicos = [
    {
        nome: "Teste de Perfil Tecnológico",
        descricao: "Descubra quais áreas da Tecnologia mais combinam com seus interesses, habilidades e preferências.",
        link: "testeperfil.html"
    },

    {
        nome: "Guia de Carreiras em Tecnologia",
        descricao: "Conheça diferentes carreiras na área de Tecnologia, suas principais funções, mercado de Trabalho, salários e perspectivas profissionais.",
        link: "guiacarreira.html"
    },

    {
        nome: "Cursos e Trilhas de Aprendizagem",
        descricao: "Receba recomendações de cursos e trilhas de aprendizagem para desenvolver suas habilidades em Tecnologia",
        link: "cursotrilha.html"
    }
];

function renderizarServicos() {
    const listaServicos = document.querySelector("#listaServicos");

    // Verifica se a página possui a lista de serviços
    if (!listaServicos) {
        return;
    }

    // Limpa os cards existentes
    listaServicos.innerHTML = "";

    // Cria um card para cada serviço
    servicos.forEach((servico) => {
        const card = document.createElement("article");
        card.classList.add("card-servico");

        const titulo = document.createElement("h3");
        titulo.textContent = servico.nome;

        const descricao = document.createElement("p");
        descricao.textContent = servico.descricao;

        const link = document.createElement("a");
        link.classList.add("orientacao");
        link.href = servico.link;

        if (servico.nome === "Teste de Perfil Tecnológico") {
            link.textContent = "Iniciar Teste";
        } else if (servico.nome === "Guia de Carreiras em Tecnologia") {
            link.textContent = "Explorar Carreiras";
        } else {
            link.textContent = "Ver Cursos e Trilhas";
        }

        card.append(titulo, descricao, link);

        listaServicos.appendChild(card);
    });
}

// Executa a função depois que o HTML for carregado
document.addEventListener("DOMContentLoaded", renderizarServicos);

console.table(servicos);

console.log(servicos[0].nome);
console.log(servicos[1].descricao);

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
        textoResultado.textContent =
            "Seu perfil demonstra interesse por programação, criação de sites e resolução de problemas. A área de Programação pode ser uma opção para você explorar.";
    } else {
        textoResultado.textContent =
            "Você pode conhecer outras áreas da Tecnologia e descobrir quais atividades mais combinam com seus interesses.";
    }

    janelaResultado.classList.add("ativo");

    document.activeElement.blur();
}