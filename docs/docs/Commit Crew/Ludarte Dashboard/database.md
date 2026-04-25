# Database

## 1. Visao geral

O banco de dados do **Dashboard** foi modelado para sustentar a operacao principal do sistema: controle de colaboradores, clientes, materiais, pedidos e pagamentos. Ele segue um modelo relacional e foi pensado para manter a integridade das informacoes, facilitar consultas gerenciais e permitir a evolucao da aplicacao.

Na implementacao atual, o banco trabalha com **PostgreSQL** e se conecta ao backend por meio do **SQLAlchemy** e do driver **psycopg2-binary**.

## 2. Modelo conceitual

A imagem abaixo representa o modelo conceitual das entidades principais do sistema e seus relacionamentos:

![Modelo conceitual do banco de dados](/img/modelo_conceitual.svg)

## 3. Tabelas do banco

### `roles`

Tabela responsavel por definir os papeis de acesso dos usuarios do sistema.

- `id`: identificador unico da role. Chave primaria.
- `nome`: nome da role, como `ADMIN`, `GERENTE` ou `VENDEDOR`.
- `nivel_acesso`: valor numerico usado nas regras de permissao.

Essa tabela existe para centralizar a autorizacao do sistema e evitar que as permissoes fiquem espalhadas diretamente no cadastro dos colaboradores.

### `colaboradores`

Tabela que armazena os usuarios internos que utilizam a aplicacao.

- `id`: identificador unico do colaborador. Chave primaria.
- `nome`: nome completo do colaborador.
- `email`: email do usuario. Possui restricao de unicidade.
- `senha`: senha armazenada em hash.
- `telefone`: telefone de contato.
- `role_id`: chave estrangeira para `roles(id)`.

Cada colaborador pertence a uma role, e isso define o que ele pode visualizar, editar ou excluir dentro da API.

### `clientes`

Tabela de cadastro dos clientes atendidos pela empresa.

- `id`: identificador unico do cliente. Chave primaria.
- `nome`: nome do cliente ou da empresa.
- `email`: email de contato.
- `telefone`: telefone de contato.
- `cpf_cnpj`: documento principal do cliente. No backend, esse campo e tratado com criptografia.
- `hash_cpf`: hash derivado do documento, usado como apoio de seguranca e consistencia.
- `endereco`: endereco principal do cliente.
- `observacoes`: campo livre para anotar informacoes complementares.

Essa tabela concentra os dados cadastrais e serve como base para o historico comercial do sistema.

### `materiais`

Tabela que registra os materiais usados nos pedidos.

- `id`: identificador unico do material. Chave primaria.
- `tipo`: categoria do material, como acrilico ou policarbonato.
- `cor`: cor do material.
- `espessura`: espessura cadastrada para o item.
- `altura`: altura do material.
- `largura`: largura do material.
- `preco_m2`: preco por metro quadrado.

Ela permite que os pedidos sejam compostos por itens reais de producao, o que aproxima o banco da rotina operacional da empresa.

### `pedidos`

Tabela central do sistema, que guarda as informacoes de cada pedido.

- `id`: identificador unico do pedido. Chave primaria.
- `colaborador_id`: chave estrangeira para `colaboradores(id)`.
- `cliente_id`: chave estrangeira para `clientes(id)`.
- `descricao`: descricao do pedido.
- `valor`: valor total do pedido.
- `data_entrada`: data em que o pedido entrou no sistema.
- `data_entrega`: data prevista de entrega.
- `horario_entrega`: horario previsto de entrega.
- `status_pedido`: status operacional do pedido.

Observacao importante:
A estrutura inicial do banco define os campos essenciais do pedido, e o modelo atual utilizado pelo backend tambem considera `horario_entrega` para representar melhor a operacao de entrega.

### `pedido_materiais`

Tabela associativa que liga pedidos e materiais.

- `id`: identificador unico do registro. Chave primaria.
- `pedido_id`: chave estrangeira para `pedidos(id)`.
- `material_id`: chave estrangeira para `materiais(id)`.
- `quantidade`: quantidade do material usada naquele pedido.

Essa tabela existe porque um pedido pode ter varios materiais, e um mesmo material pode aparecer em varios pedidos. Ou seja, ela resolve um relacionamento **muitos-para-muitos**.

### `pagamentos`

Tabela usada para registrar os pagamentos vinculados aos pedidos.

- `id`: identificador unico do pagamento. Chave primaria.
- `pedido_id`: chave estrangeira para `pedidos(id)`.
- `forma_pagamento`: forma usada para pagamento.
- `status_pagamento`: situacao do pagamento.
- `valor_pago`: valor efetivamente pago.
- `data_pagamento`: data em que o pagamento foi registrado ou efetuado.

Essa tabela permite acompanhar recebimentos e calcular valores recebidos e em aberto no dashboard.

## 4. Relacionamentos entre as tabelas

### `roles` 1:N `colaboradores`

Uma role pode estar associada a varios colaboradores, mas cada colaborador pertence a apenas uma role.

### `colaboradores` 1:N `pedidos`

Um colaborador pode criar varios pedidos, mas cada pedido esta ligado a um unico colaborador responsavel.

### `clientes` 1:N `pedidos`

Um cliente pode ter varios pedidos ao longo do tempo, mas cada pedido pertence a um unico cliente.

### `pedidos` 1:N `pagamentos`

Um pedido pode possuir um ou mais registros de pagamento, enquanto cada pagamento pertence a apenas um pedido.

### `pedidos` N:N `materiais`

Esse relacionamento nao acontece diretamente. Ele e resolvido pela tabela `pedido_materiais`.

Na pratica:

- um pedido pode usar varios materiais;
- um material pode aparecer em varios pedidos;
- `pedido_materiais` guarda a quantidade usada em cada associacao.

## 5. Chaves primarias e estrangeiras

### Chaves primarias

Todas as tabelas principais usam `id` como chave primaria:

- `roles.id`
- `colaboradores.id`
- `clientes.id`
- `materiais.id`
- `pedidos.id`
- `pedido_materiais.id`
- `pagamentos.id`

### Chaves estrangeiras

As ligacoes entre entidades sao feitas por:

- `colaboradores.role_id -> roles.id`
- `pedidos.colaborador_id -> colaboradores.id`
- `pedidos.cliente_id -> clientes.id`
- `pedido_materiais.pedido_id -> pedidos.id`
- `pedido_materiais.material_id -> materiais.id`
- `pagamentos.pedido_id -> pedidos.id`

Essas chaves sao fundamentais para garantir integridade referencial no banco de dados.

## 6. Regras e observacoes importantes

### Seguranca dos dados

Alguns dados sao tratados com protecao especial no backend:

- `senha` e armazenada com hash;
- `cpf_cnpj` e armazenado com criptografia;
- `hash_cpf` funciona como apoio para seguranca e processamento sem expor diretamente o documento.

### Integridade de negocio

O backend aplica validacoes para impedir inconsistencias, por exemplo:

- um pedido nao pode ser criado para um cliente inexistente;
- um item de `pedido_materiais` nao deve apontar para material inexistente;
- pagamentos ficam sempre vinculados a um pedido;
- colaboradores dependem de uma role valida para o controle de acesso.

### Inicializacao do banco

O processo de inicializacao do banco nao apenas cria tabelas. Ele tambem:

- insere roles padrao;
- cria o usuario administrador inicial;
- migra senhas antigas para hash;
- migra documentos de clientes para formato criptografado.

## 7. Leitura funcional do modelo

Do ponto de vista do negocio, o banco funciona assim:

- primeiro existem as roles, que definem perfis de acesso;
- depois os colaboradores usam essas roles para operar o sistema;
- os clientes sao cadastrados como base comercial;
- os materiais representam os insumos ou itens usados na producao;
- os pedidos conectam cliente, colaborador e valor comercial;
- `pedido_materiais` detalha o que foi usado em cada pedido;
- `pagamentos` registra o retorno financeiro ligado aos pedidos.

Esse desenho permite atender tanto o lado operacional quanto o lado gerencial do sistema.

## 8. Consideracoes finais

O banco de dados do projeto foi estruturado de forma simples, mas suficiente para representar bem o dominio da aplicacao. Ele possui entidades claras, relacionamentos coerentes e suporte tanto para rotinas operacionais quanto para consultas do dashboard.

O modelo tambem demonstra preocupacao com seguranca, rastreabilidade e expansao futura, o que torna a base de dados adequada para sustentar o crescimento do sistema.
