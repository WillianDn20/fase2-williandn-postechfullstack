```markdown
# Tech Challenge - Aplicação de Blogging (Fase 2)

Este projeto é a refatoração do Back-end de uma aplicação de blogging para professores da rede pública, desenvolvida em Node.js com persistência de dados em NoSQL (MongoDB).

## Arquitetura da Aplicação

A aplicação segue o padrão de arquitetura MVC (Model-View-Controller) simplificado:
- **Models:** Define a estrutura de dados das postagens (Schema do Mongoose).
- **Controllers:** Contém as regras de negócio e a lógica de CRUD.
- **Routes:** Mapeia os endpoints da API para as funções do controller.
- **Banco de Dados:** MongoDB rodando isoladamente via contêiner Docker.

## Setup Inicial

Para rodar este projeto localmente, você precisará do [Node.js](https://nodejs.org/) e do [Docker](https://www.docker.com/) instalados.

1. Clone o repositório:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd blog-tech-challenge

```

2. Instale as dependências:
```bash
npm install

```


3. Inicie o banco de dados via Docker:
```bash
docker compose up -d

```


4. Inicie o servidor:
```bash
npm run dev

```


O servidor estará rodando em `http://localhost:3000`.

## Guia de Uso das APIs

A API consome e retorna dados no formato JSON.

* **`GET /posts`**: Retorna a lista de todas as postagens.
* **`GET /posts/:id`**: Retorna os detalhes de uma postagem específica.
* **`GET /posts/search?term=palavra`**: Busca postagens pelo título ou conteúdo.
* **`POST /posts`**: Cria uma nova postagem. Requer `title`, `content` e `author` no corpo da requisição.
* **`PUT /posts/:id`**: Atualiza uma postagem existente.
* **`DELETE /posts/:id`**: Exclui uma postagem.

## Testes e Cobertura

O projeto garante estabilidade das funções críticas com testes unitários usando Jest e Supertest.
Para rodar os testes e ver a cobertura de código:

```bash
npm run test -- --coverage

```

## Desafios Enfrentados

Durante o desenvolvimento, o principal desafio foi estruturar a comunicação limpa entre o ambiente local do Node.js e o contêiner do MongoDB isolado pelo Docker. Garantir que os testes unitários não sujassem o banco de dados de produção exigiu a implementação de uma rotina de setup e teardown dedicada (`beforeAll` e `afterAll`) com um banco temporário exclusivo para os testes automatizados, permitindo atingir e superar a meta de 20% de cobertura de código.
