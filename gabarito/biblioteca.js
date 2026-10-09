// Missão 18 e projeto final. Dados em memória, reiniciados com o servidor.
const express = require('express');
const { livroValido } = require('./validacao');
const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

const livros = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899, disponivel: true },
  { id: 2, titulo: 'A Hora da Estrela', autor: 'Clarice Lispector', ano: 1977, disponivel: false }
];
let proximoId = 3;

// A busca por autor e o filtro disponivel podem ser combinados.
app.get('/livros', (req, res) => {
  const { autor, disponivel } = req.query;
  if (autor !== undefined && typeof autor !== 'string') {
    return res.status(400).json({ erro: 'Autor inválido' });
  }
  if (disponivel !== undefined && disponivel !== 'true' && disponivel !== 'false') {
    return res.status(400).json({ erro: 'Use disponivel=true ou disponivel=false' });
  }
  const resultado = livros.filter(livro =>
    (autor === undefined || livro.autor.toLowerCase().includes(autor.toLowerCase())) &&
    (disponivel === undefined || livro.disponivel === (disponivel === 'true'))
  );
  return res.json(resultado);
});

app.get('/livros/:id', (req, res) => {
  const livro = livros.find(l => l.id === Number(req.params.id));
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  return res.json(livro);
});

app.post('/livros', (req, res) => {
  if (!livroValido(req.body)) return res.status(400).json({ erro: 'Dados inválidos' });
  const { titulo, autor, ano, disponivel } = req.body;
  const livro = { id: proximoId++, titulo: titulo.trim(), autor: autor.trim(), ano, disponivel };
  livros.push(livro);
  return res.status(201).location(`/livros/${livro.id}`).json(livro);
});

app.put('/livros/:id', (req, res) => {
  const indice = livros.findIndex(l => l.id === Number(req.params.id));
  if (indice < 0) return res.status(404).json({ erro: 'Livro não encontrado' });
  if (!livroValido(req.body)) return res.status(400).json({ erro: 'Dados inválidos' });
  const { titulo, autor, ano, disponivel } = req.body;
  livros[indice] = {
    id: livros[indice].id, titulo: titulo.trim(), autor: autor.trim(), ano, disponivel
  };
  return res.json(livros[indice]);
});

app.patch('/livros/:id/emprestar', (req, res) => {
  const livro = livros.find(l => l.id === Number(req.params.id));
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado' });
  if (!livro.disponivel) return res.status(409).json({ erro: 'Livro já está emprestado' });
  livro.disponivel = false;
  return res.json(livro);
});

app.delete('/livros/:id', (req, res) => {
  const indice = livros.findIndex(l => l.id === Number(req.params.id));
  if (indice < 0) return res.status(404).json({ erro: 'Livro não encontrado' });
  livros.splice(indice, 1);
  return res.status(204).send();
});

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use((err, req, res, next) => {
  if (err.status === 400) return res.status(400).json({ erro: 'JSON inválido' });
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Biblioteca: http://localhost:${PORT}`));
}

module.exports = app;
