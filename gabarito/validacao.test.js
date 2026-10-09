const test = require('node:test');
const assert = require('node:assert/strict');
const { produtoValido, livroValido } = require('./validacao');

test('missão 17: aceita produto válido e rejeita entradas inválidas', () => {
  assert.equal(produtoValido({ nome: 'Mouse', preco: 59.9, estoque: 2 }), true);
  for (const dados of [
    { nome: '', preco: 10, estoque: 1 },
    { nome: 'Mouse', preco: -1, estoque: 1 },
    { nome: 'Mouse', preco: '10', estoque: 1 },
    { nome: 'Mouse', preco: 10, estoque: 1.5 },
    null
  ]) assert.equal(produtoValido(dados), false);
});

test('projeto final: valida os campos do livro', () => {
  assert.equal(livroValido({ titulo: 'Livro', autor: 'Ana', ano: 2020, disponivel: true }), true);
  assert.equal(livroValido({ titulo: ' ', autor: 'Ana', ano: 2020, disponivel: true }), false);
  assert.equal(livroValido({ titulo: 'Livro', autor: 'Ana', ano: 2020.5, disponivel: true }), false);
});
