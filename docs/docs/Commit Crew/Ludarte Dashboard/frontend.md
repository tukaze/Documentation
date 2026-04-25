# Frontend

## 1. O que e o frontend do projeto

O frontend do **Dashboard** e a camada visual da aplicacao. Ele e responsavel por apresentar as informacoes ao usuario, capturar interacoes, enviar requisicoes para a API e transformar os dados recebidos em telas funcionais, organizadas e agradaveis de usar.

No projeto, o frontend foi desenvolvido como uma **SPA (Single Page Application)** com **React**, **TypeScript** e **Vite**. Isso significa que a navegacao acontece no navegador sem recarregar a pagina inteira a cada troca de rota, o que melhora a fluidez da experiencia.

De forma geral, o frontend cuida de:

- autenticar o usuario visualmente;
- controlar a navegacao entre as paginas;
- proteger rotas privadas;
- consumir a API do backend;
- exibir dashboards, tabelas, formularios e modals;
- organizar estados locais de carregamento, erro e sucesso;
- apresentar dados de forma grafica e responsiva.

## 2. Como o frontend funciona

O fluxo principal do frontend pode ser resumido assim:

1. a aplicacao e iniciada em `src/main.tsx`;
2. o componente raiz `src/App.tsx` define as rotas;
3. ao fazer login, o frontend envia email e senha para a API;
4. o token JWT retornado e salvo no `localStorage`;
5. as rotas protegidas verificam se existe token salvo;
6. os services fazem chamadas HTTP para o backend;
7. as paginas recebem os dados e os distribuem para os componentes visuais;
8. a interface renderiza tabelas, graficos, cards, modais e formularios.

Na pratica, o frontend trabalha como uma ponte inteligente entre o usuario e a API: ele nao apenas mostra dados, mas organiza a experiencia de uso do sistema.

## 3. Stack utilizada

### Tecnologias principais

- **React 19**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Tailwind CSS 4**
- **Recharts**
- **Lucide React**

### Ferramentas de desenvolvimento

- **ESLint**
- **TypeScript ESLint**
- **@eslint/js**
- **eslint-plugin-react-hooks**
- **eslint-plugin-react-refresh**
- **PostCSS**
- **Autoprefixer**
- **@vitejs/plugin-react**

## 4. Por que cada tecnologia foi usada

### React

O React foi utilizado porque o projeto possui varias telas administrativas, componentes reutilizaveis e interacoes dinamicas. Ele facilita a divisao da interface em partes menores, como topbar, graficos, tabelas, formularios e modais.

No projeto, isso aparece claramente em componentes como:

- `AppTopbar.tsx`
- `RevenueChart.tsx`
- `PedidoDetail.tsx`

### TypeScript

O TypeScript foi escolhido para trazer tipagem estatica ao frontend. Como a aplicacao consome muitos objetos da API, como pedidos, clientes, materiais e indicadores do dashboard, a tipagem ajuda a:

- evitar erros de estrutura de dados;
- facilitar autocomplete;
- melhorar a manutencao;
- documentar melhor o formato das respostas.

Exemplo disso esta em:

- `types/pedidos.ts`
- `types/dashboard.ts`

### Vite

O Vite foi utilizado como bundler e servidor de desenvolvimento. Ele foi escolhido por oferecer:

- inicializacao rapida;
- hot reload eficiente;
- configuracao moderna;
- boa integracao com React e TypeScript.

Isso torna o processo de desenvolvimento mais rapido e mais agradavel.

### React Router DOM

Foi utilizado para gerenciar a navegacao entre as telas do sistema. Em vez de recarregar paginas do servidor, a aplicacao troca de rota no cliente.

No projeto, ele controla telas como:

- `/`
- `/dashboard`
- `/pedidos`
- `/clientes`
- `/materiais`
- `/colaboradores`

Tambem foi usado para proteger rotas privadas com o componente `PrivateRoute` em `src/App.tsx`.

### Tailwind CSS

O Tailwind foi escolhido para estilizar a interface com rapidez e consistencia. Como o sistema usa muitos cards, modais, botoes, tabelas e areas de destaque, a abordagem utilitaria ajuda a manter um padrao visual forte sem espalhar muito CSS por varios arquivos.

No projeto, ele aparece em praticamente toda a interface com classes como:

- `rounded-[28px]`
- `border border-white/10`
- `bg-zinc-900/80`
- `text-zinc-400`
- `shadow-[0_20px_60px_rgba(0,0,0,0.25)]`

### Recharts

O Recharts foi utilizado para desenhar os graficos do dashboard e de outras telas analiticas. Ele foi escolhido porque funciona bem com React e facilita a construcao de visualizacoes de dados com componentes.

Exemplos no projeto:

- faturamento mensal;
- recorrencia de clientes;
- uso mensal de materiais;
- distribuicao de status.

### Lucide React

Foi usado para disponibilizar icones leves e modernos. Mesmo quando o uso e pontual, essa biblioteca ajuda a manter uma linguagem visual consistente na interface.

### ESLint e plugins

Foram usados para padronizar o codigo, reduzir problemas comuns e manter a base mais saudavel.

### PostCSS e Autoprefixer

Foram usados como apoio na pipeline de estilos, permitindo melhor compatibilidade e integracao com Tailwind.

### @vitejs/plugin-react

Foi utilizado para integrar React ao Vite de forma oficial, habilitando transformacoes e comportamento esperado no desenvolvimento.

## 5. Estrutura do frontend

O frontend esta dividido em camadas bem claras.

### `src/main.tsx`

Ponto de entrada da aplicacao. Ele monta o React no DOM e importa o CSS global.

### `src/App.tsx`

Arquivo raiz da navegacao. Define as rotas da aplicacao e aplica protecao para as areas privadas.

### `src/pages/`

Contem as paginas principais do sistema:

- `Login.tsx`
- `Dashboard.tsx`
- `Pedidos.tsx`
- `Clientes.tsx`
- `Materiais.tsx`
- `Colaboradores.tsx`

Essas paginas concentram o estado principal de cada modulo e coordenam o carregamento dos dados.

### `src/components/`

Contem os componentes visuais reutilizaveis e organizados por dominio:

- `auth/`
- `dashboard/`
- `clientes/`
- `pedidos/`
- `materiais/`
- `layout/`
- `ui/`

### `src/services/`

Responsavel pela comunicacao com o backend.

Arquivos principais:

- `api.ts`
- `auth.ts`
- `dashboardServices.ts`
- `pedidosService.ts`
- `clientesService.ts`
- `materiaisService.ts`
- `colaboradoresService.ts`

### `src/types/`

Reune as interfaces e tipos da aplicacao. Essa pasta e importante para manter o contrato com a API claro.

### `src/assets/`

Contem imagens e arquivos visuais, como logo e previews.

## 6. Principais paginas do sistema

### Login

A tela de login, em `pages/Login.tsx`, nao e apenas um formulario simples. Ela foi organizada em etapas visuais:

- tela inicial;
- transicao;
- modal de autenticacao;
- redirecionamento apos sucesso.

Esse desenho melhora a experiencia do usuario e torna a entrada no sistema mais marcante.

### Dashboard

A pagina `pages/Dashboard.tsx` funciona como centro gerencial da aplicacao.

Ela busca varios conjuntos de dados em paralelo com `Promise.all`, o que reduz o tempo de espera geral. Depois disso, distribui os resultados entre varios componentes especializados, como:

- hero principal;
- cards de resumo;
- grafico de faturamento;
- status de pedidos;
- pedidos recentes;
- materiais mais usados;
- ranking de clientes.

### Pedidos

A tela `pages/Pedidos.tsx` e uma das mais complexas do sistema.

Ela coordena:

- listagem paginada;
- busca e filtros;
- resumo operacional;
- modal de criacao e edicao;
- visualizacao detalhada;
- exclusao;
- download de recibo.

Essa pagina e um bom exemplo de como o frontend concentra fluxo de tela, enquanto os componentes menores cuidam da apresentacao.

### Clientes

A tela `pages/Clientes.tsx` mistura listagem, resumo comercial, grafico de recorrencia e detalhes do cliente.

Ela tambem mostra um uso interessante de `useMemo` para filtrar, ordenar e paginar dados locais de forma eficiente.

### Materiais

A pagina `pages/Materiais.tsx` administra o catalogo de materiais e adiciona uma camada visual mais forte com paleta e grafico de uso mensal.

### Colaboradores

A tela `pages/Colaboradores.tsx` cuida do gerenciamento interno da equipe, com criacao de usuarios, carregamento de roles e exclusao controlada.

## 7. Como os dados circulam no frontend

O fluxo de dados foi estruturado para ficar simples e legivel.

### 7.1 Services centralizam a API

O arquivo `services/api.ts` concentra a logica base de comunicacao HTTP.

Ele faz quatro coisas importantes:

- le a `VITE_API_URL`;
- monta a URL final da requisicao;
- injeta o token quando `auth: true`;
- padroniza o tratamento de erro.

Isso evita repeticao nas chamadas do restante do sistema.

### 7.2 Paginas controlam estado

As paginas usam `useState` e `useEffect` para:

- carregar dados;
- controlar carregamento;
- armazenar erros;
- abrir ou fechar modais;
- guardar filtros, busca e paginacao.

### 7.3 Componentes recebem props

Os componentes visuais geralmente nao conhecem a API diretamente. Eles recebem os dados prontos por props e se concentram na renderizacao.

Esse padrao melhora:

- reutilizacao;
- legibilidade;
- separacao de responsabilidades.

## 8. Explicando partes do codigo

### 8.1 Protecao de rotas

Em `src/App.tsx`, o componente `PrivateRoute` verifica se existe token salvo:

```tsx
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
```

Esse trecho e importante porque impede o acesso a paginas privadas quando o usuario ainda nao autenticou.

### 8.2 Camada base de fetch

Em `services/api.ts`, a funcao `apiFetch` padroniza a comunicacao com o backend:

```ts
if (options.auth && token) {
  headers.set("Authorization", `Bearer ${token}`);
}
```

Aqui o frontend adiciona automaticamente o token nas rotas autenticadas. Isso reduz repeticao e torna o consumo da API mais consistente.

Outro ponto importante e o tratamento de erro:

```ts
if (!response.ok) {
  let errorMessage = "Erro ao processar a requisicao.";
  ...
  throw new Error(errorMessage);
}
```

Essa abordagem faz com que os componentes trabalhem com erros em formato previsivel.

### 8.3 Login e persistencia local

Em `pages/Login.tsx`, depois do login bem-sucedido, o frontend salva token e usuario:

```tsx
if (response.token) {
  localStorage.setItem("token", response.token);
}

if (response.user) {
  localStorage.setItem("user", JSON.stringify(response.user));
}
```

Isso permite que a aplicacao mantenha a sessao e exiba informacoes como nome do usuario na topbar.

### 8.4 Carregamento paralelo do dashboard

Em `pages/Dashboard.tsx`, os dados sao carregados com `Promise.all`.

Essa escolha foi usada porque o dashboard depende de varios endpoints independentes. Carregar tudo em paralelo torna a tela mais eficiente do que fazer uma requisicao por vez.

### 8.5 Tipagem de contratos

Em `types/pedidos.ts`, o tipo `PedidoDetail` estende `Pedido` e adiciona materiais e pagamentos.

Isso e uma boa pratica porque:

- reaproveita estrutura base;
- reduz duplicacao;
- deixa claro que a visao detalhada do pedido e uma extensao da listagem.

### 8.6 Download de PDF

Em `services/pedidosService.ts`, o recibo nao usa `apiFetch` porque a resposta e um arquivo binario, nao JSON.

Esse detalhe mostra uma decisao tecnica correta: a camada base de fetch foi feita para JSON, entao o download foi tratado separadamente com `blob`, `createObjectURL` e clique programatico.

### 8.7 Componentes detalhistas de interface

O componente `components/pedidos/PedidoDetail.tsx` mostra bem a estrategia do projeto:

- a pagina abre o modal;
- o componente recebe o pedido pronto;
- o componente so organiza a apresentacao de descricao, pagamentos e materiais.

Isso evita que o componente visual precise conhecer a origem dos dados.

## 9. Estilo visual e experiencia do usuario

O frontend recebeu uma atencao especial na apresentacao visual. Ele nao foi construido apenas como painel tecnico, mas como uma interface com identidade.

### Fundo animado

O componente `components/ui/AnimatedBackground.tsx` cria um fundo com gradientes, orbs desfocados e textura. Isso ajuda a dar profundidade visual ao sistema.

### CSS global

O arquivo `src/index.css` define:

- animacoes personalizadas;
- estilos auxiliares para selects;
- classes de glow e elementos decorativos;
- comportamento de orbs e waves.

Ou seja, o projeto nao depende apenas de Tailwind puro. Existe uma combinacao entre utilitarios e CSS customizado para resultados visuais mais ricos.

### Layout responsivo

A interface usa muito:

- `grid`
- `flex`
- breakpoints como `md`, `lg` e `xl`
- menus adaptados para mobile

Um bom exemplo disso esta em `components/layout/AppTopbar.tsx`, que troca navegacao horizontal por menu mobile em telas menores.

## 10. Vantagens da arquitetura frontend

Alguns pontos fortes dessa arquitetura sao:

- separacao clara entre paginas, componentes, services e types;
- reutilizacao de componentes visuais;
- tipagem consistente com a API;
- protecao de rotas privadas;
- centralizacao da camada HTTP;
- tratamento claro de erro, loading e estado de formulario;
- uso de graficos para leitura gerencial;
- interface com identidade visual forte.

## 11. O que mais foi usado no frontend

Além das bibliotecas principais, o frontend tambem usa conceitos e recursos importantes:

- `useState` para estado local;
- `useEffect` para efeitos e carregamento de dados;
- `useMemo` para filtros e ordenacao;
- `localStorage` para persistencia de sessao;
- `fetch` para consumo da API;
- `URLSearchParams` para montar query strings;
- `Intl.NumberFormat` para formatacao monetaria;
- `Promise.all` para carregamento paralelo;
- `Blob` e `createObjectURL` para download de arquivos;
- assets visuais como logo e previews do dashboard.

## 12. Consideracoes finais

O frontend do Acrilico Dashboard foi construido para ser **moderno, organizado, responsivo e funcional**. Ele combina uma arquitetura clara com uma experiencia visual bem trabalhada, sem perder o foco operacional.

As escolhas tecnicas fizeram sentido para o tipo de projeto: React e TypeScript oferecem estrutura e seguranca, Vite acelera o desenvolvimento, Tailwind agiliza a composicao visual, e os services com tipagem mantem o consumo da API limpo e sustentavel.

Mais do que apenas "mostrar telas", o frontend organiza a experiencia completa do usuario dentro do sistema.
