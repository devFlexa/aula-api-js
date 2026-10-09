function produtoValido(dados) {
  return dados !== null && typeof dados === 'object' &&
    typeof dados.nome === 'string' && dados.nome.trim().length > 0 &&
    typeof dados.preco === 'number' && Number.isFinite(dados.preco) && dados.preco >= 0 &&
    Number.isInteger(dados.estoque) && dados.estoque >= 0;
}

function livroValido(dados) {
  return dados !== null && typeof dados === 'object' &&
    typeof dados.titulo === 'string' && dados.titulo.trim().length > 0 &&
    typeof dados.autor === 'string' && dados.autor.trim().length > 0 &&
    Number.isInteger(dados.ano) && dados.ano > 0 &&
    typeof dados.disponivel === 'boolean';
}

module.exports = { produtoValido, livroValido };
