# Aula: APIs REST com Node.js e Express

Material complementar ao arquivo `laboratorio_node_express_visual_profissional.html`.
Os exemplos e o gabarito são projetos executáveis independentes. Os dados ficam em
memória e voltam ao estado inicial quando o processo reinicia.

## Preparação

1. Instale Node.js e confira com `node --version` e `npm --version`.
2. Nesta pasta, execute `npm install`.
3. No PowerShell, se `npm` estiver bloqueado pela política de scripts, use `npm.cmd install` e `npm.cmd run ...`.
4. Execute **um servidor de cada vez**. Pressione Ctrl+C antes de iniciar outro.

| Comando | Arquivo | Conteúdo | Porta padrão |
| --- | --- | --- | --- |
| `npm run exemplo:inicial` | `exemplos/app.js` | 12 passos e módulo 06 | 3000 |
| `npm run exemplo:crud` | `exemplos/server.js` | CRUD do módulo 07 | 3000 |
| `npm run gabarito` | `gabarito/app.js` | Missões 01–17 e extras | 3000 |
| `npm run biblioteca` | `gabarito/biblioteca.js` | Missão 18 e projeto final | 3001 |
| `npm test` | `gabarito/validacao.test.js` | Validação da missão 17 | — |

## Roteiro de aula (8–12 horas)

| Tempo | Atividade | Arquivo de apoio |
| --- | --- | --- |
| 1 h | Explicar cliente, servidor, JSON, métodos HTTP e códigos 200/201/204/400/404 | HTML, módulos 01–03 |
| 1 h | Verificar Node/npm, instalar Express, executar a primeira rota | `exemplos/app.js` |
| 1–2 h | Fazer os 12 passos iniciais; testar rota, parâmetro, query e JSON | `exemplos/app.js` |
| 2 h | Construir e testar CRUD com GET, POST, PUT e DELETE | `exemplos/server.js` |
| 2–3 h | Resolver missões 01–12; comparar com gabarito depois | `gabarito/app.js` |
| 1–2 h | Resolver missões 13–17: paginação, ordem, erros, Router e teste | `gabarito/routes/produtos.js` |
| 1–2 h | Criar e demonstrar a API de biblioteca; registrar evidências | `gabarito/biblioteca.js` |

Use o quiz do HTML para fechar a aula. Gabarito: **1 B (POST), 2 C (não
encontrado), 3 A (`req.body`), 4 B (voltam ao estado inicial)**.

## Gabarito dos 12 passos iniciais

As rotas completas estão em `exemplos/app.js`. O passo 02 é `npm init -y` e
`npm install express`; o 03 inicia o servidor. Teste os demais assim:

| Passo | Requisição | Resposta esperada |
| --- | --- | --- |
| 01 | GET `/` | `API online` |
| 04 | GET `/ola` | `Olá, turma!` |
| 05 | GET `/sobre` | `Estou aprendendo APIs!` |
| 06 | GET `/contato` | `Contato: turma@exemplo.com` |
| 07 | GET `/aluno` | `{"nome":"Ana","idade":15}` |
| 08 | GET `/frutas` | `["maçã","banana","uva"]` |
| 09 | GET `/soma` | `{"resultado":8}` |
| 10 | GET `/saudacao/Ana` | `Olá, Ana!` |
| 11 | GET `/boasvindas?nome=Ana` | `Bem-vindo, Ana` |
| 12 | GET `/ola`, `/frutas`, `/aluno` | texto, array JSON, objeto JSON |

## Gabarito das 18 missões

| Missões | Onde está a solução | O que conferir |
| --- | --- | --- |
| 01–02 | `gabarito/app.js` | GET `/` e `/status` |
| 03–06 | `gabarito/routes/produtos.js` | Lista, ID, nome sem distinguir maiúsculas, 200/404 |
| 07–10 | `gabarito/routes/produtos.js`, `gabarito/validacao.js` | POST 201, PUT 200, DELETE 204, inválidos 400 |
| 11 | `gabarito/app.js` | Data/hora, método e URL no terminal |
| 12 | Matriz de testes abaixo | Testar e registrar resposta de cada método |
| 13–14 | `gabarito/routes/produtos.js` | `page`, `limit`, `ordem=asc/desc` |
| 15 | `gabarito/app.js` | GET `/erro-controlado` → 500 |
| 16 | `gabarito/routes/produtos.js` | `express.Router()` montado em `/produtos` |
| 17 | `gabarito/validacao.test.js` | `npm test` |
| 18 | `gabarito/biblioteca.js` | CRUD, filtro por autor, validações, README |

O checklist do módulo 10 é atendido pelo exemplo CRUD e pelo gabarito. Os
desafios extras estão no gabarito: GET `/status`, GET `/produtos?nome=mouse`
e PATCH `/produtos/:id/estoque`. A melhoria documentada pode ser a busca por
nome, demonstrada com a requisição abaixo.

## Requisições para demonstrar (PowerShell)

Inicie `npm.cmd run gabarito` em um terminal. Em outro terminal:

```powershell
curl.exe -i http://localhost:3000/produtos
curl.exe -i http://localhost:3000/produtos/999
curl.exe -i 'http://localhost:3000/produtos?nome=MOUSE'
curl.exe -i 'http://localhost:3000/produtos?page=1&limit=2&ordem=desc'
curl.exe -i -X POST http://localhost:3000/produtos -H 'Content-Type: application/json' -d '{"nome":"Webcam","preco":120,"estoque":4}'
curl.exe -i -X PUT http://localhost:3000/produtos/1 -H 'Content-Type: application/json' -d '{"nome":"Mouse novo","preco":79.9,"estoque":10}'
curl.exe -i -X PATCH http://localhost:3000/produtos/1/estoque -H 'Content-Type: application/json' -d '{"estoque":0}'
curl.exe -i -X POST http://localhost:3000/produtos -H 'Content-Type: application/json' -d '{"nome":"Inválido","preco":-1,"estoque":2}'
curl.exe -i -X DELETE http://localhost:3000/produtos/1
```

Matriz esperada: **GET 200**, **GET ID ausente 404**, **POST válido 201**,
**PUT válido 200**, **PATCH válido 200**, **POST inválido 400** e
**DELETE válido 204 sem corpo**. IDs mudam conforme os cadastros feitos.

Para o projeto final, execute `npm.cmd run biblioteca` e use a porta 3001:

```powershell
curl.exe -i http://localhost:3001/livros
curl.exe -i 'http://localhost:3001/livros?autor=machado&disponivel=true'
curl.exe -i -X POST http://localhost:3001/livros -H 'Content-Type: application/json' -d '{"titulo":"Livro novo","autor":"Ana","ano":2024,"disponivel":true}'
curl.exe -i -X PUT http://localhost:3001/livros/1 -H 'Content-Type: application/json' -d '{"titulo":"Dom Casmurro","autor":"Machado de Assis","ano":1899,"disponivel":true}'
curl.exe -i -X PATCH http://localhost:3001/livros/1/emprestar
curl.exe -i -X DELETE http://localhost:3001/livros/2
```

| Endpoint da biblioteca | Resposta de sucesso | Erros principais |
| --- | --- | --- |
| GET `/livros` | 200 + lista; filtros `autor` e `disponivel` | 400 em filtro inválido |
| GET `/livros/:id` | 200 + livro | 404 |
| POST `/livros` | 201 + livro; exige título, autor, ano e disponível | 400 |
| PUT `/livros/:id` | 200 + livro atualizado | 400, 404 |
| PATCH `/livros/:id/emprestar` | 200 + `disponivel:false` | 404, 409 se já emprestado |
| DELETE `/livros/:id` | 204 sem corpo | 404 |

Para entregar as evidências, anote método, URL, corpo enviado, status, corpo
recebido e uma captura de tela de cada operação. Registre também uma dificuldade
encontrada e como ela foi resolvida. No projeto final, avalie servidor/rotas
(2 pontos), CRUD (4), validação/códigos HTTP (2) e testes/documentação (2),
conforme o HTML.
