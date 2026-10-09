// Missão 16: as rotas ficam em um Router separado.
const router = require('express').Router();
const { produtoValido } = require('../validacao');

const produtos = [
  { id: 1, nome: 'Mouse', preco: 59.90, estoque: 12 },
  { id: 2, nome: 'Teclado', preco: 99.90, estoque: 8 },
  { id: 3, nome: 'Monitor', preco: 699.90, estoque: 5 }
];
let proximoId = 4;

// Missões 03, 05, 13 e 14: filtros, ordenação e paginação opcionais.
router.get('/', (req, res) => {
  const { nome, ordem, page, limit } = req.query;
  if (nome !== undefined && typeof nome !== 'string') {
    return res.status(400).json({ erro: 'Nome inválido' });
  }
  if (ordem !== undefined && ordem !== 'asc' && ordem !== 'desc') {
    return res.status(400).json({ erro: 'Ordem inválida: use asc ou desc' });
  }
  let resultado = produtos.filter(p =>
    nome === undefined || p.nome.toLowerCase().includes(nome.toLowerCase())
  );
  if (ordem) {
    const sinal = ordem === 'desc' ? -1 : 1;
    resultado = [...resultado].sort((a, b) => (a.preco - b.preco) * sinal);
  }
  // Sem page/limit, a listagem continua a devolver um array simples.
  if (page === undefined && limit === undefined) return res.json(resultado);
  const pagina = page === undefined ? 1 : Number(page);
  const limite = limit === undefined ? 5 : Number(limit);
  if (!Number.isInteger(pagina) || pagina < 1 || !Number.isInteger(limite) || limite < 1) {
    return res.status(400).json({ erro: 'Paginação inválida' });
  }
  return res.json({
    page: pagina,
    limit: limite,
    total: resultado.length,
    dados: resultado.slice((pagina - 1) * limite, pagina * limite)
  });
});

// Missões 04 e 06.
router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === Number(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  return res.json(produto);
});

// Missões 07 e 10: o servidor decide o ID; entrada inválida gera 400.
router.post('/', (req, res) => {
  if (!produtoValido(req.body)) return res.status(400).json({ erro: 'Dados inválidos' });
  const { nome, preco, estoque } = req.body;
  const produto = { id: proximoId++, nome: nome.trim(), preco, estoque };
  produtos.push(produto);
  return res.status(201).location(`/produtos/${produto.id}`).json(produto);
});

// Missão 08: PUT substitui os campos editáveis do produto.
router.put('/:id', (req, res) => {
  const indice = produtos.findIndex(p => p.id === Number(req.params.id));
  if (indice < 0) return res.status(404).json({ erro: 'Produto não encontrado' });
  if (!produtoValido(req.body)) return res.status(400).json({ erro: 'Dados inválidos' });
  const { nome, preco, estoque } = req.body;
  produtos[indice] = { id: produtos[indice].id, nome: nome.trim(), preco, estoque };
  return res.json(produtos[indice]);
});

// Desafio extra do módulo 10.
router.patch('/:id/estoque', (req, res) => {
  const produto = produtos.find(p => p.id === Number(req.params.id));
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
  if (!req.body || !Number.isInteger(req.body.estoque) || req.body.estoque < 0) {
    return res.status(400).json({ erro: 'Estoque deve ser um inteiro não negativo' });
  }
  produto.estoque = req.body.estoque;
  return res.json(produto);
});

// Missão 09.
router.delete('/:id', (req, res) => {
  const indice = produtos.findIndex(p => p.id === Number(req.params.id));
  if (indice < 0) return res.status(404).json({ erro: 'Produto não encontrado' });
  produtos.splice(indice, 1);
  return res.status(204).send();
});

module.exports = router;
