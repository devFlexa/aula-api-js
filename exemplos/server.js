// Módulo 07: CRUD básico. Os dados são reiniciados ao parar o servidor.
const express = require('express');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

let produtos = [
  { id: 1, nome: 'Mouse', preco: 59.90, estoque: 12 },
  { id: 2, nome: 'Teclado', preco: 99.90, estoque: 8 }
];
let proximoId = 3;

function produtoValido(dados) {
  return dados && typeof dados.nome === 'string' && dados.nome.trim().length > 0 &&
    typeof dados.preco === 'number' && Number.isFinite(dados.preco) && dados.preco >= 0 &&
    Number.isInteger(dados.estoque) && dados.estoque >= 0;
}

app.get('/produtos', (req, res) => res.json(produtos));

app.get('/produtos/:id', (req, res) => {
  const produto = produtos.find(p => p.id === Number(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  return res.json(produto);
});

app.post('/produtos', (req, res) => {
  if (!produtoValido(req.body)) {
    return res.status(400).json({ erro: 'Informe nome, preco e estoque válidos' });
  }
  const { nome, preco, estoque } = req.body;
  const produto = { id: proximoId++, nome: nome.trim(), preco, estoque };
  produtos.push(produto);
  return res.status(201).location(`/produtos/${produto.id}`).json(produto);
});

app.put('/produtos/:id', (req, res) => {
  const indice = produtos.findIndex(p => p.id === Number(req.params.id));
  if (indice < 0) return res.status(404).json({ erro: 'Produto não encontrado' });
  if (!produtoValido(req.body)) return res.status(400).json({ erro: 'Dados inválidos' });
  const { nome, preco, estoque } = req.body;
  produtos[indice] = { id: produtos[indice].id, nome: nome.trim(), preco, estoque };
  return res.json(produtos[indice]);
});

app.delete('/produtos/:id', (req, res) => {
  const indice = produtos.findIndex(p => p.id === Number(req.params.id));
  if (indice < 0) return res.status(404).json({ erro: 'Produto não encontrado' });
  produtos.splice(indice, 1);
  return res.status(204).send();
});

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use((err, req, res, next) => {
  if (err.status === 400) return res.status(400).json({ erro: 'JSON inválido' });
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno do servidor' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`CRUD: http://localhost:${PORT}`));
}

module.exports = app;
