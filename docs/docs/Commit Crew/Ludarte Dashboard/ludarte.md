# Ludarte Dashboard

## Demo interativa

Para explorar o projeto em funcionamento diretamente pela documentacao, o dashboard tambem pode ser acessado abaixo:

<iframe
  src="https://acrilico-dashboard.vercel.app"
  title="Ludarte Dashboard Demo"
  width="100%"
  height="720"
></iframe>

Se a visualizacao incorporada nao abrir no seu navegador, acesse diretamente:

[Abrir dashboard em nova aba](https://acrilico-dashboard.vercel.app)

## 1. O que e o projeto

O **Dashboard** e um sistema web desenvolvido para apoiar a gestao operacional de uma empresa que trabalha com produtos e servicos em acrilico. o dashboard centraliza, em um unico ambiente, o controle de **clientes**, **pedidos**, **materiais**, **colaboradores** e indicadores gerais do negocio.

O projeto foi estruturado como uma aplicacao full stack, com:

- **backend** responsavel pelas regras de negocio, autenticacao, seguranca e integracao com o banco de dados;
- **frontend** responsavel pela interface visual, navegacao e consumo da API;
- **banco de dados relacional** para armazenamento consistente das informacoes do sistema.

Basicamente o sistema permite cadastrar clientes, registrar pedidos, relacionar materiais usados em cada produção, acompanhar status das entregas, visualizar dados resumidos no dashboard e controlar o acesso de usuarios por nivel de permissão.

## 2. Objetivo do projeto

O principal objetivo do projeto e **organizar e digitalizar o fluxo de trabalho da empresa**, reduzindo controles manuais e facilitando a visualizacao das informações mais importantes do negocio.

Entre os objetivos especificos do sistema, destacam-se:

- centralizar dados operacionais em uma unica plataforma;
- facilitar o cadastro e a consulta de clientes;
- registrar pedidos com mais controle sobre prazos, valores e status;
- acompanhar materiais usados na producao;
- oferecer indicadores visuais para apoiar a tomada de decisao;
- controlar o acesso de colaboradores de acordo com o nivel de permissao;
- proteger dados sensiveis, como documentos e credenciais de acesso.

## 3. Stack utilizada

### Frontend

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Recharts**
- **Lucide React**

### Backend

- **Python**
- **Flask**
- **Flask-CORS**
- **SQLAlchemy**
- **psycopg2-binary**
- **PyJWT**
- **cryptography**
- **Werkzeug**
- **python-dotenv**
- **pandas**
- **reportlab**
- **gunicorn**

### Banco de dados 

- **PostgreSQL**
- **Docker Compose**
- **Adminer**

## 4. Por que cada tecnologia foi usada

### React
Foi utilizado no frontend porque permite a construcao de interfaces modernas, componentizadas e reutilizaveis. Como o sistema possui varias telas administrativas, como dashboard, pedidos, clientes, materiais e colaboradores, o React ajuda a manter o codigo mais organizado e escalavel pra todas essa telas 

### TypeScript
Utilizado para trazer tipagem estatica ao frontend. Ajuda a reduzir erros, melhora a manutenção do codigo e facilita o desenvolvimento de formularios, tabelas e integrações com a API.

### Vite
Ferramenta de build e ambiente de desenvolvimento por ser rapido e leve. Isso melhora a experiencia durante o desenvolvimento, especialmente no carregamento do projeto e na atualizacao instantanea da interface.

### React Router DOM
Foi utilizado para controlar a navegação entre as paginas do sistema, como login, dashboard, pedidos, clientes, materiais e colaboradores. Ele tambem ajuda na protecao de rotas internas, exigindo autenticação para acessar areas privadas.

### Tailwind CSS
Foi usado para estilizar a interface com mais produtividade e consistencia visual. Como o projeto possui varios cards, tabelas, modais e paineis, o Tailwind ajuda a construir telas responsivas sem depender de muito CSS separado e gigante

### Recharts
Foi utilizado para exibir graficos e indicadores do dashboard, como faturamento, status de pedidos, materiais mais usados e recorrencia de clientes. Essa biblioteca facilita a visualizacao de dados de forma clara e interativa.

### Lucide React
Foi escolhido para fornecer icones modernos e leves para a interface. Isso melhora a usabilidade e a leitura visual dos componentes sem aumentar demais a complexidade do frontend.

### Python
Foi utilizado no backend por ser uma linguagem produtiva, legivel e muito adequada para APIs, regras de negocio e tratamento de dados. Tambem oferece um ecossistema forte para seguranca, relatorios e integracao com banco de dados.

### Flask
Foi escolhido para desenvolver a API por ser um microframework simples, flexivel e de facil organizacao. Ele permite separar bem as rotas do sistema e implementar apenas os recursos necessarios, sem sobrecarga de estrutura.

### Flask-CORS
Foi utilizado para permitir a comunicacao segura entre frontend e backend em ambientes diferentes, como no desenvolvimento local ou em deploy separado.

### SQLAlchemy
Foi adotado para mapear as tabelas do banco em modelos Python e facilitar operacoes com os dados. Isso melhora a organizacao da camada de persistencia e reduz a escrita manual de consultas repetitivas.

### psycopg2-binary
Foi utilizado como driver de conexao entre o Python e o PostgreSQL. Ele permite que o backend envie e receba dados do banco com estabilidade.

### PyJWT
Foi usado para autenticar usuarios por meio de tokens JWT. Isso permite controlar sessoes de forma stateless e proteger e rastrear acessos a todas as rotas do Dashboard

### cryptography
Foi utilizada para reforcar a segurança do sistema, especialmente na criptografia de dados sensiveis, como CPF ou CNPJ armazenados no cadastro de clientes. garantindo segurança mesmo em um possivél vazamento de dados.

### Werkzeug
Foi aproveitado principalmente para gerar e validar hashes de senha com seguranca, evitando o armazenamento de senhas em texto puro, garantindo segurança mesmo em um possivél vazamento de dados

### python-dotenv
Foi usado para carregar variaveis de ambiente, como chaves secretas e configuracoes de banco. Isso melhora a seguranca e facilita a configuracao do projeto em diferentes ambientes.

### pandas
Foi incluido para apoiar manipulacao e organizacao de dados no backend, especialmente em cenarios de relatorios, agregacoes ou preparacao de informacoes para exibicao.

### reportlab
Foi utilizado para gerar documentos em PDF, como recibos de pedidos. Essa escolha agrega valor pratico ao sistema, permitindo emitir arquivos diretamente pela aplicacao.

### gunicorn
Foi incluido para servir a aplicacao backend em ambiente de producao, oferecendo uma forma mais adequada de executar a API fora do ambiente de desenvolvimento.

### PostgreSQL
Foi escolhido como banco de dados principal por ser robusto, confiavel e adequado para sistemas relacionais com varias entidades ligadas entre si, como clientes, pedidos, pagamentos, materiais e colaboradores.

### Docker Compose
Foi utilizado para facilitar a subida do ambiente local, principalmente do banco de dados. Isso reduz problemas de configuracao e torna o projeto mais facil de executar em diferentes maquinas.

### Adminer
Foi adicionado como ferramenta auxiliar para visualizar e administrar o banco de dados durante o desenvolvimento, de forma simples e acessivel pelo navegador.

## 5. Estrutura funcional do sistema

O sistema foi pensado para cobrir etapas importantes da rotina administrativa e operacional da empresa:

- **Autenticacao e controle de acesso**: login com token JWT e diferenciacao de usuarios por nivel de permissao;
- **Gestao de clientes**: cadastro, consulta e acompanhamento de historico;
- **Gestao de pedidos**: criacao, edicao, exclusao, detalhamento e acompanhamento de status;
- **Gestao de materiais**: controle dos materiais cadastrados e sua relacao com os pedidos;
- **Gestao de colaboradores**: administracao de usuarios internos e seus papeis;
- **Dashboard gerencial**: exibicao de metricas, graficos e informacoes resumidas para acompanhamento rapido do negocio;
- **Geracao de recibos**: emissao de documentos em PDF ligados aos pedidos.

## 6. Consideracoes finais

O Acrilico Dashboard foi desenvolvido com foco em **organizacao, produtividade, seguranca e visualizacao de dados**. A stack escolhida combina um frontend moderno e dinamico com um backend simples, robusto e facil de manter.

A escolha das tecnologias nao foi feita apenas por popularidade, mas pela adequacao ao problema proposto: construir uma aplicacao de gestao empresarial com boa experiencia de uso, controle de acesso, persistencia confiavel de dados e possibilidade de crescimento futuro.
