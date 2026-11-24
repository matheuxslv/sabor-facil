# Sabor Fácil - Site de Receitas Culinárias

## 1. Título/tema do projeto

Sabor Fácil - Site de Receitas Culinárias

## 2. Integrantes

1. Radmila
2. Isadora
3. Matheus
4. Mikelly
5. Júlia

## 3. Visão geral do projeto

O Sabor Fácil é um site para mostrar receitas culinárias de forma simples e organizada. A ideia é facilitar a busca por receitas do dia a dia, mostrando os ingredientes e o modo de preparo de cada prato. Os usuários também podem enviar suas próprias receitas, que ficam pendentes até serem aprovadas na área de moderação antes de aparecer no site.

## 4. Requisitos Funcionais de alto-nível

**RF01: Visualizar receitas**

O sistema deve mostrar uma lista com as receitas aprovadas disponíveis no site.

**RF02: Pesquisar receitas**

O sistema deve permitir pesquisar receitas pelo nome.

**RF03: Visualizar detalhes da receita**

O sistema deve mostrar os ingredientes e o modo de preparo da receita selecionada.

**RF04: Filtrar receitas por categoria**

O sistema deve permitir ver as receitas separadas por categoria, como doces, salgados e bebidas.

**RF05: Enviar nova receita**

O sistema deve permitir que o usuário envie uma nova receita por um formulário. A receita é salva com o status "pendente".

**RF06: Moderar receitas**

O sistema deve ter uma área de moderação que lista as receitas pendentes, onde é possível aprovar (a receita passa a aparecer no site) ou recusar (a receita é removida).

## 5. Frameworks e bibliotecas utilizados

**Front-end:**

- Angular (versão mais recente)
- TypeScript
- Bootstrap, para o layout e a responsividade
- Angular Router, para as rotas entre as páginas
- Reactive Forms do Angular, para os formulários e validações
- HttpClient do Angular, para a comunicação com a API

**Back-end:**

- Node.js
- Express, para criar a API REST
- Banco de dados relacional (MySQL, PostgreSQL ou SQLite, ainda vamos definir)

## 6. Divisão das tarefas

- **Radmila:** back-end em Node.js com Express e banco de dados (tabela de receitas com o campo status e rotas da API).
- **Matheus:** criação do projeto Angular, configuração do Bootstrap, modelo Receita, ReceitaService e tela inicial com filtro por categorias.
- **Isadora:** rotas da aplicação, navbar e footer, pesquisa por nome e tela de detalhes da receita.
- **Mikelly:** formulário de envio de nova receita, com validações e envio para a API com status "pendente".
- **Júlia:** tela de moderação (aprovar ou recusar receitas pendentes) e ajustes de responsividade.

## 7. Como rodar o projeto

É preciso ter o **Node.js 22.13 ou mais novo** instalado (recomendado a versão 24 LTS). O banco usa o SQLite que já vem no Node, então não precisa instalar banco de dados separado.

**Back-end (API):**

```bash
cd backend
npm install
npm start
```

A API fica em `http://localhost:3000/api/receitas`. Na primeira vez o arquivo `receitas.db` é criado com algumas receitas de exemplo. Pode aparecer um aviso `ExperimentalWarning` sobre o SQLite, é normal.

**Front-end (Angular):**

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

Depois é só abrir `http://localhost:4200` no navegador. A API precisa estar rodando ao mesmo tempo.


### Versão publicada (GitHub Pages)

Link: https://matheuxslv.github.io/sabor-facil/

O GitHub Pages só hospeda arquivos estáticos e não executa o back-end em Node. Por isso a versão publicada é uma **demonstração**: ela usa as mesmas telas, mas salva as receitas no `localStorage` do navegador em vez de chamar a API (cada pessoa vê só os próprios dados). O projeto completo, com a API e o banco de dados, roda seguindo os passos acima.

A publicação é feita automaticamente pelo GitHub Actions (`.github/workflows/deploy-pages.yml`) a cada alteração na branch `main`, usando a configuração `pages` do Angular.

### Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/receitas | Lista as receitas aprovadas (filtros: `categoria`, `nome`) |
| GET | /api/receitas?status=pendente | Lista as receitas pendentes |
| GET | /api/receitas/:id | Detalhes de uma receita |
| POST | /api/receitas | Cadastra uma receita (entra como pendente) |
| PATCH | /api/receitas/:id/aprovar | Aprova uma receita pendente |
| DELETE | /api/receitas/:id | Recusa (exclui) uma receita |

### Páginas do site

- `/` - início, com as receitas aprovadas e o filtro por categoria
- `/pesquisa` - pesquisa por nome
- `/receita/:id` - ingredientes e modo de preparo
- `/nova-receita` - formulário para enviar receita
- `/moderacao` - aprovar ou recusar receitas pendentes
