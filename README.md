# 💻 Portal de Orientação para Carreiras em Tecnologia

## 📌 Sobre o Projeto

O **Portal de Orientação para Carreiras em Tecnologia** é um Portal de Serviços desenvolvido para auxiliar acadêmicos, estudantes de Programação e pessoas que desejam ingressar na área de Tecnologia a conhecer diferentes possibilidades de atuação profissional.

Atualmente, muitos estudantes possuem dificuldades para decidir qual caminho seguir diante da grande variedade de áreas disponíveis, como Desenvolvimento Web, Desenvolvimento Mobile, Análise de Dados, Inteligência Artificial e Cyber Segurança.

O Portal busca tornar esse processo mais simples, reunindo informações, orientações e recomendações que ajudam o usuário a identificar suas afinidades, conhecer diferentes profissões e planejar sua trajetória de aprendizagem.

## 🎯 Objetivo

Oferecer uma experiência intuitiva e orientativa, ajudando estudantes a identificar áreas compatíveis com seus interesses, conhecer as possibilidades do mercado de trabalho e encontrar caminhos para desenvolver os conhecimentos necessários.

A proposta é acompanhar o usuário desde a descoberta de possíveis áreas de interesse até a construção de uma trilha de aprendizagem.

## 👥 Público-Alvo

O Portal é destinado principalmente a:

- Acadêmicos de cursos de Tecnologia;
- Estudantes de Programação;
- Pessoas que estão iniciando na área de Tecnologia;
- Estudantes que possuem dúvidas sobre qual carreira seguir;
- Futuros profissionais que desejam se especializar em uma área tecnológica.

## ⚠️ Problema Abordado

A grande quantidade de possibilidades na área de Tecnologia pode dificultar a escolha de uma carreira.

Muitos estudantes acabam tentando aprender diferentes áreas simultaneamente e encontram dificuldades para estabelecer uma trajetória profissional.

O Portal busca contribuir para a solução desse problema, reunindo informações, orientações e recomendações em um único ambiente, permitindo que o estudante explore suas possibilidades e encontre um caminho de estudos mais adequado aos seus objetivos.

## 🛠️ Serviços Oferecidos

### 🧩 1. Teste de Perfil Tecnológico

Questionário desenvolvido para identificar a afinidade do usuário com diferentes áreas da Tecnologia.

Após responder às perguntas, o Portal apresenta as áreas que possuem maior compatibilidade com o perfil identificado, como:

- Desenvolvimento Web;
- Desenvolvimento Mobile;
- Análise de Dados;
- Inteligência Artificial;
- Cyber Segurança.

### 📚 2. Guia de Carreiras em Tecnologia

Apresenta informações sobre as principais áreas de atuação profissional, permitindo que o usuário conheça melhor cada carreira.

Entre as informações disponibilizadas estão:

- Descrição da profissão;
- Principais responsabilidades;
- Mercado de trabalho;
- Faixa salarial média;
- Tendências da área.

### 🎓 3. Cursos e Trilhas de Aprendizagem

Reúne recomendações de cursos gratuitos e pagos relacionados às diferentes carreiras em Tecnologia.

Os conteúdos são organizados conforme o nível de conhecimento:

- **Iniciante:** primeiros conceitos e fundamentos;
- **Intermediário:** aprofundamento dos conhecimentos;
- **Avançado:** conteúdos especializados e práticas mais complexas.

Também são apresentadas sugestões de ordem de estudo, ajudando o usuário a compreender quais conhecimentos podem ser desenvolvidos primeiro e quais devem ser estudados posteriormente.

### 🔎 4. Explorar Projetos de Tecnologia

Funcionalidade que permite pesquisar linguagens de programação e conhecer repositórios públicos disponíveis no GitHub.

O usuário pode pesquisar tecnologias como Python, Java, JavaScript, TypeScript, PHP, entre outras.

Os resultados apresentam:

- Nome do repositório;
- Descrição resumida em português, gerada pelo próprio Portal a partir do nome, da descrição e dos tópicos disponíveis;
- Linguagem principal;
- Quantidade de estrelas;
- Nome do proprietário;
- Link para acessar o repositório no GitHub.

A pesquisa aceita linguagens previamente definidas no Portal e também algumas abreviações, como JS para JavaScript e TS para TypeScript. Os repositórios são ordenados pela quantidade de estrelas e, após a consulta, o JavaScript confere a linguagem informada e apresenta até seis resultados.

## 🌐 API Utilizada

### GitHub REST API — Pesquisa de repositórios

A funcionalidade **Explorar Projetos de Tecnologia** utiliza a API pública do GitHub para pesquisar repositórios conforme a linguagem de programação informada pelo usuário.

**Endpoint utilizado:**

`https://api.github.com/search/repositories`

A consulta envia parâmetros para pesquisar pela linguagem, ordenar os repositórios pela quantidade de estrelas (em ordem decrescente) e limitar a quantidade de itens analisados. A requisição é realizada com `fetch()` e `async/await`. A resposta é interpretada como JSON e os dados recebidos são utilizados para montar os cards de resultados no HTML por meio do DOM.

**Tratamentos implementados na pesquisa:**

- Campo vazio ou linguagem não suportada: apresenta uma orientação e não inicia a consulta;
- Consulta em andamento: apresenta a mensagem “Consultando projetos...”, desabilita temporariamente o botão e sinaliza o estado de carregamento;
- Resultados encontrados: apresenta até seis repositórios;
- Nenhum resultado correspondente: informa que nenhum projeto foi encontrado;
- Falha na requisição ou resposta inesperada: apresenta uma mensagem de erro;
- Limite de requisições da API: informa que o limite foi atingido e orienta o usuário a tentar novamente mais tarde.

O código também permite cancelar uma pesquisa anterior quando uma nova consulta é iniciada.

**Importante:** a implementação atual consulta somente o endpoint de pesquisa de repositórios (`/search/repositories`). Ela não realiza consultas adicionais aos endpoints de perfis de usuários (`/users/{username}`) ou de organizações (`/orgs/{orgname}`), nem identifica ou prioriza proprietários por localização.

**Documentação oficial:**

https://docs.github.com/en/rest/search/search#search-repositories

## 💻 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias fundamentais do desenvolvimento Web Front-End:

- **HTML5:** Utilizado para estruturar as páginas e organizar os conteúdos do Portal.
- **CSS3:** Responsável pela estilização das páginas, organização dos elementos e adaptação da interface para diferentes dispositivos.
- **JavaScript:** Utilizado para implementar a interatividade, as funcionalidades e a integração com APIs externas.
- **Git:** Utilizado para realizar o controle de versão e acompanhar as alterações realizadas durante o desenvolvimento.
- **GitHub:** Utilizado para armazenar e disponibilizar o código-fonte do projeto, além de fornecer acesso à API utilizada na consulta de projetos de Tecnologia.
- **GitHub Pages:** Utilizado para publicar o Portal na Internet, permitindo que os usuários acessem suas funcionalidades.

## ⚙️ Funcionalidades e recursos de desenvolvimento

Além das páginas informativas, o Portal possui recursos interativos implementados em JavaScript:

- **Catálogo de serviços:** os serviços são organizados em dados no JavaScript e apresentados dinamicamente na página;
- **Filtro por categoria:** permite visualizar serviços conforme a categoria selecionada;
- **Formulário de contato:** utiliza validação dos campos no HTML e no JavaScript, incluindo a remoção de espaços excedentes com `trim()`;
- **Serviço favorito:** permite selecionar um serviço favorito e mantém essa preferência no `localStorage`, inclusive após atualizar a página;
- **Pesquisa de projetos:** consulta a GitHub REST API e apresenta repositórios relacionados à linguagem escolhida.

Os scripts JavaScript ficam separados dos arquivos HTML, dentro da pasta `js/`.

## 🚀 Como o Portal Funciona

A jornada do usuário pode ser organizada em três etapas principais:

**1. Descobrir →**

Realizar o Teste de Perfil Tecnológico e identificar possíveis áreas de afinidade.

**2. Conhecer →**

Explorar o Guia de Carreiras para compreender as características, responsabilidades e oportunidades de cada área.

**3. Aprender →**

Acessar cursos e trilhas de aprendizagem para começar a desenvolver as habilidades necessárias.

Além disso, o usuário pode explorar projetos reais de Tecnologia para conhecer aplicações práticas das linguagens de programação.

## 🌟 Benefícios

O Portal proporciona:

- Maior facilidade na escolha de uma área profissional;
- Informações organizadas sobre carreiras em Tecnologia;
- Identificação de possíveis áreas de afinidade;
- Conhecimento sobre o mercado de trabalho;
- Recomendações de cursos e conteúdos;
- Trilhas de aprendizagem organizadas por nível;
- Contato com projetos reais de programação;
- Uma experiência simples e intuitiva para estudantes.

## 📱 Responsividade e Acessibilidade

O Portal busca oferecer uma experiência adequada em diferentes dispositivos, incluindo computadores, notebooks, tablets e smartphones.

A interface utiliza recursos de HTML, CSS e JavaScript para proporcionar uma navegação organizada, intuitiva e acessível.

## ▶️ Como Executar o Projeto

1. Faça o download ou clone o repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Localize o arquivo `index.html`.
4. Execute o projeto utilizando a extensão Live Server ou outro servidor local.
5. Navegue pelas páginas e teste as funcionalidades disponíveis.
6. Na página de serviços, teste o filtro por categoria e a seleção de um serviço favorito. Atualize a página para verificar a persistência da preferência.
7. Na área **Explorar Projetos de Tecnologia**, teste o campo vazio, uma linguagem não suportada e uma linguagem válida. Confira os estados de carregamento, os resultados e as mensagens de erro quando aplicáveis.
8. Na página de contato, teste o preenchimento e a validação do formulário.

**Observação:** a pesquisa de projetos depende de conexão com a Internet e da disponibilidade da API pública do GitHub. A API pode limitar temporariamente as requisições.

## 🌍 Publicação

**Repositório no GitHub:**

https://github.com/carlosdev33/Trabalho-PortalDeServicos.git

**Portal publicado no GitHub Pages:**

https://carlosdev33.github.io/Trabalho-PortalDeServicos

## 👨‍💻 Autor(a)

Carlos Augusto Petri da Silva

Projeto desenvolvido como atividade acadêmica da disciplina de Programação Web - Front-End, do curso de Análise e Desenvolvimento de Sistemas (A.D.S)

---

# 📖 Panorama Front-End

Esta seção apresenta alguns conceitos importantes estudados durante a disciplina de Programação Web Front-End.

### 1. O que significa componentização e por que dividir uma interface em partes reutilizáveis?

Componentização é dividir uma interface em partes menores, cada uma com uma função específica. Isso facilita a organização do código, a manutenção e o reaproveitamento de elementos em diferentes páginas.

### 2. Qual a diferença geral entre uma aplicação multipágina e uma SPA (Single Page Application)?

Uma aplicação multipágina carrega páginas diferentes conforme a navegação do usuário. Já uma SPA funciona principalmente em uma única página, atualizando os conteúdos sem precisar recarregar toda a interface a cada navegação.

### 3. O que é Bootstrap e em que situação ele pode acelerar a criação de uma interface responsiva?

Bootstrap é um framework CSS que oferece componentes e estilos prontos, como botões, formulários e sistemas de grade. Ele facilita a criação de interfaces responsivas e agiliza o desenvolvimento.

### 4. O que são React, Vue e Angular? Cite uma característica geral de cada um.

São tecnologias utilizadas para desenvolver interfaces Web.

- **React:** biblioteca JavaScript baseada em componentes.
- **Vue:** framework progressivo conhecido por sua simplicidade e facilidade de integração.
- **Angular:** framework que oferece uma estrutura mais completa para desenvolver aplicações Web.

### 5. Por que frameworks não substituem o conhecimento de HTML, CSS e JavaScript?

Porque HTML, CSS e JavaScript são a base do desenvolvimento Web. Os frameworks facilitam o trabalho, mas precisamos compreender essas tecnologias para desenvolver, corrigir e manter aplicações corretamente.

### 6. Como a IA pode ajudar no desenvolvimento sem substituir a compreensão do código?

A IA pode ajudar a identificar erros, sugerir melhorias, explicar trechos de código e acelerar tarefas. Porém, o desenvolvedor precisa compreender, testar e validar as soluções antes de utilizá-las.

---

## 📌 Considerações Finais

O **Portal de Orientação para Carreiras em Tecnologia** foi desenvolvido para ser um ponto de partida para estudantes que ainda possuem dúvidas sobre qual caminho seguir na área de Tecnologia.

Por meio do Teste de Perfil Tecnológico, Guia de Carreiras, Cursos e Trilhas de Aprendizagem e da funcionalidade Explorar Projetos de Tecnologia, o Portal reúne recursos que ajudam o usuário a conhecer suas possibilidades, compreender melhor o mercado e planejar sua evolução profissional.

A proposta é tornar a jornada de descoberta e aprendizagem mais organizada, acessível e orientativa.

**🚀 Conhecer possibilidades, descobrir interesses e construir o próprio caminho na Tecnologia!**