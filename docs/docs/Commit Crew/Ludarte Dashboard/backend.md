# Backend

## 1. O que e o backend do projeto

O backend do **Dashboard** e a camada responsavel por processar as regras de negocio da aplicacao, controlar o acesso dos usuarios, validar permissoes, manipular os dados do banco e entregar as informacoes ao frontend por meio de uma API HTTP.

Ele foi desenvolvido em **Python com Flask** e segue uma organizacao modular, separando rotas, servicos, utilitarios, modelos e consultas SQL. Essa divisao facilita a manutenção do codigo e deixa a aplicação mais clara para evoluções futuras.

De forma geral, o backend cuida de:

- autenticar colaboradores;
- autorizar acessos com base em nivel de permissão;
- cadastrar, listar, editar e excluir entidades do sistema;
- gerar dados consolidados para o dashboard;
- proteger dados sensiveis;
- gerar recibos em PDF para pedidos.

## 2. Como a API funciona

A API segue o estilo **REST**, com comunicacao em **JSON** na maior parte das rotas. O frontend envia requisicoes HTTP para o backend e recebe respostas estruturadas com dados, mensagens de sucesso ou mensagens de erro.

O fluxo principal funciona assim:

1. o usuario faz login pela rota `/login`;
2. a API valida email e senha;
3. se os dados estiverem corretos, a API gera um **token JWT**;
4. o frontend armazena esse token e o envia nas proximas requisicoes no cabeçalho `Authorization: Bearer <token>`;
5. as rotas protegidas validam o token antes de processar a requisicao;
6. depois da autenticação, o backend aplica as regras de permissão conforme o papel do usuario.

## 3. Estrutura do backend em Flask

O backend esta organizado em modulos para separar responsabilidades:

### `app.py`
Arquivo principal da aplicacao. Nele sao criados o app Flask, a configuracao de CORS e o registro dos blueprints.

### `config.py`
Centraliza as configurações do ambiente, como:

- `DATABASE_URL`;
- `JWT_SECRET_KEY`;
- `FERNET_KEY`;
- `CPF_HASH_KEY`;
- `SECRET_KEY`;
- `CORS_ORIGINS`;
- `HOST`, `PORT` e `DEBUG`.

Esse arquivo tambem valida se o ambiente de produçao esta corretamente configurado.

### `routes/`
Contem os endpoints da API, separados por dominio:

- `auth_routes.py`
- `clientes_routes.py`
- `material_routes.py`
- `pedidos_routes.py`
- `dashboard_routes.py`
- `colaboradores_routes.py`

### `services/`
Abriga regras mais especificas de negocio, como autenticação de usuario.

### `database/`
Contem a conexao com o banco, os modelos ORM e o script de inicialização:

- `connection.py`
- `models.py`
- `init_db.py`

### `utils/`
Reune funções auxiliares importantes para o funcionamento do sistema:

- autenticação por token;
- criptografia e hash;
- controle de permissoes;
- calculo de status de pedidos.

### `querys/`
Armazena as consultas SQL reutilizadas no sistema. Isso ajuda a separar a logica SQL da definição das rotas.

## 4. Principais rotas da API

### Autenticacao

- `POST /login`

Recebe `email` e `senha`. Se as credenciais forem validas, retorna:

- token JWT;
- dados do usuario autenticado;
- role e nivel de acesso.

### Clientes

- `GET /clientes`
- `GET /clientes/<id>`
- `GET /clientes/<id>/resumo`
- `POST /clientes`
- `PUT /clientes/<id>`

Essas rotas permitem listar clientes, consultar um cliente especifico, obter um resumo com historico de pedidos e cadastrar ou atualizar registros.

Um ponto importante e que o CPF/CNPJ e armazenado de forma protegida no banco, mas e descriptografado no retorno da API quando necessario para exibição.

### Materiais

- `GET /materiais`
- `GET /materiais/<id>`
- `POST /materiais`
- `PUT /materiais/<id>`
- `DELETE /materiais/<id>`

Essas rotas controlam o cadastro de materiais utilizados nos pedidos, como tipo, cor, espessura, dimensoes e preco por metro quadrado.

### Pedidos

- `GET /pedidos`
- `GET /pedidos/<id>`
- `POST /pedidos`
- `PUT /pedidos/<id>`
- `DELETE /pedidos/<id>`
- `GET /pedidos/<id>/recibo`

As rotas de pedidos são uma das partes centrais da API. Elas permitem:

- listar pedidos com paginacao e filtros;
- visualizar detalhes de um pedido;
- cadastrar novos pedidos;
- editar pedidos existentes;
- excluir pedidos;
- gerar um recibo em PDF.

Cada pedido pode possuir:

- cliente relacionado;
- colaborador responsavel;
- materiais associados;
- pagamentos registrados;
- data e horario de entrega;
- status operacional.

### Dashboard

- `GET /dashboard/resumo`
- `GET /dashboard/pedidos-status`
- `GET /dashboard/pedidos-clientes-recorrencia`
- `GET /dashboard/pedidos-atrasados`
- `GET /dashboard/faturamento-mensal`
- `GET /dashboard/materiais-mais-usados`
- `GET /dashboard/materiais-mais-usados-mensal`
- `GET /dashboard/pedidos-recentes`
- `GET /dashboard/pedidos-entrega-hoje`
- `GET /dashboard/faturamento-por-cliente`

Essas rotas retornam dados para a interface do dashboard. Em vez de apenas expor registros brutos, elas entregam informacoes prontas para exibicao em cards, tabelas e graficos.

### Colaboradores

- `GET /colaboradores`
- `GET /colaboradores/roles`
- `POST /colaboradores`
- `DELETE /colaboradores/<id>`

Essas rotas são destinadas ao gerenciamento de usuarios internos. Apenas usuarios administradores podem acessar essas operacoes.

## 5. Autenticacao da API

A autenticacao e feita com **JWT (JSON Web Token)**.

O processo funciona da seguinte maneira:

1. o usuario envia email e senha para `/login`;
2. o backend busca o colaborador no banco;
3. a senha e validada;
4. se estiver correta, a API gera um token com:
   - `user_id`;
   - `email`;
   - `iat` (momento de emissao);
   - `exp` (momento de expiracao);
5. esse token e devolvido ao frontend;
6. as rotas protegidas exigem o token no cabecalho `Authorization`.

O middleware `token_required`:

- verifica se o cabecalho foi enviado corretamente;
- valida a assinatura do token com `JWT_SECRET_KEY`;
- verifica expiracao;
- injeta no contexto da requisicao os dados basicos do usuario autenticado, como `g.user_id` e `g.email`.

Se o token nao existir, estiver expirado ou for invalido, a API responde com erro `401`.

## 6. Seguranca detalhada

O backend possui varias camadas de segurança importantes para proteger o sistema.

### 6.1 Protecao por token

Quase todas as rotas de negocio usam o decorador `@token_required`. Isso impede que usuarios nao autenticados acessem dados internos da aplicação.

### 6.2 Controle de acesso por nivel

O sistema trabalha com papeis de acesso:

- `ADMIN` com nivel `10`
- `GERENTE` com nivel `7`
- `VENDEDOR` com nivel `5`

As permissoes sao avaliadas por funcoes como:

- `can_view_pedido`
- `can_edit_pedido`
- `can_delete_pedido`

Essas regras garantem, por exemplo:

- administradores podem gerenciar tudo;
- gerentes possuem acesso ampliado, mas com restricoes em certas acoes;
- vendedores acessam principalmente os pedidos ligados ao proprio usuario.

### 6.3 Senhas com hash seguro

As senhas dos colaboradores nao devem ficar armazenadas em texto puro. O backend usa recursos do **Werkzeug** para gerar hash e verificar credenciais com seguranca.

Existe ainda uma compatibilidade com registros antigos: se uma senha antiga estiver salva sem hash, ela e convertida automaticamente para hash no primeiro login bem-sucedido.

### 6.4 Criptografia de CPF/CNPJ

Os documentos de clientes sao tratados com uma camada extra de seguranca:

- o valor principal e criptografado com **Fernet**, da biblioteca `cryptography`;
- um **hash HMAC SHA-256** tambem e armazenado para suporte a comparacoes e rastreabilidade sem expor o dado original.

Com isso, o sistema protege informacoes sensiveis sem perder a utilidade operacional desses dados.

### 6.5 Variaveis sensiveis em ambiente

As chaves e configuracoes sensiveis nao ficam fixas no codigo. Elas sao carregadas por variaveis de ambiente, como:

- `JWT_SECRET_KEY`
- `SECRET_KEY`
- `FERNET_KEY`
- `CPF_HASH_KEY`
- `DATABASE_URL`

Em producao, o backend valida essas configuracoes e falha ao iniciar se houver algum problema critico, evitando subir a aplicacao de maneira insegura.

### 6.6 Restricao de CORS

O backend usa `Flask-CORS` com lista de origens permitidas. Em producao, a configuracao nao aceita `*`, o que reduz risco de exposicao indevida da API para origens arbitrarias.

### 6.7 Protecao contra acoes indevidas

Algumas regras de seguranca de negocio tambem foram implementadas, por exemplo:

- um administrador nao pode excluir o proprio usuario logado;
- usuarios sem permissao nao podem visualizar, editar ou excluir pedidos de outros usuarios;
- pedidos so podem ser criados ou atualizados com cliente e materiais validos no banco.

## 7. Como os pedidos sao tratados

Os pedidos sao o nucleo da aplicacao, e o backend aplica varias regras sobre eles.

### Status

O status pode ser normalizado para valores base como:

- `PENDENTE`
- `EM_PRODUCAO`
- `CONCLUIDO`
- `ATRASADO`

Mas a API tambem calcula dinamicamente o status `ATRASADO`, considerando:

- data de entrega;
- horario de entrega;
- horario atual.

Isso significa que o atraso nao depende apenas de um valor salvo no banco, mas tambem da interpretacao das datas no momento da consulta.

### Relacionamentos

Cada pedido pode se relacionar com:

- um cliente;
- um colaborador;
- varios materiais;
- um ou mais pagamentos.

Ao criar ou atualizar um pedido, o backend reconstrui os itens de materiais e pagamentos associados para manter a consistencia das informacoes.

### Recibo em PDF

A rota `/pedidos/<id>/recibo` gera um documento PDF com:

- dados do pedido;
- dados do cliente;
- lista de materiais;
- pagamentos registrados;
- total do pedido e saldo.

Essa funcionalidade foi implementada com **ReportLab**.

## 8. Banco de dados e persistencia

O backend usa **PostgreSQL** como banco relacional principal e **SQLAlchemy** como camada ORM e de conexao.

As principais entidades modeladas no sistema sao:

- `roles`
- `colaboradores`
- `clientes`
- `materiais`
- `pedidos`
- `pedido_materiais`
- `pagamentos`

O arquivo `init_db.py` e responsavel por:

- criar tabelas;
- garantir colunas necessarias;
- inserir os papeis padrao do sistema;
- criar ou atualizar o usuario administrador inicial;
- migrar senhas antigas para hash;
- migrar documentos de clientes para formato criptografado.

## 9. Fluxo interno do backend

O funcionamento interno pode ser resumido assim:

1. a requisicao chega ao Flask;
2. a rota correspondente e localizada pelo blueprint;
3. se a rota for protegida, o middleware valida o JWT;
4. a rota abre uma sessao com o banco;
5. a regra de negocio e executada;
6. a API consulta ou grava dados;
7. a resposta e convertida em JSON ou arquivo PDF;
8. a sessao e encerrada.

Esse fluxo simples ajuda a deixar a API objetiva e adequada ao porte do sistema.

## 10. Pontos fortes da arquitetura

Alguns aspectos positivos da arquitetura backend deste projeto sao:

- separacao clara entre configuracao, rotas, utilitarios, banco e servicos;
- autenticacao stateless com JWT;
- controle de permissao baseado em papeis;
- protecao de dados sensiveis com hash e criptografia;
- suporte a metricas de dashboard ja processadas no backend;
- geracao de documentos em PDF;
- inicializacao automatizada do banco com papeis e usuario admin.

## 11. Consideracoes finais

O backend do  Dashboard foi desenvolvido para ser **simples, organizado, funcional e seguro**. A API nao apenas entrega dados ao frontend, mas tambem concentra regras importantes do negocio, como autenticacao, autorizacao, calculo de status, controle de visibilidade e protecao de informacoes sensiveis.

Essa estrutura torna o projeto mais profissional e mais preparado para manutenção, evolução e implantação em ambiente real.
