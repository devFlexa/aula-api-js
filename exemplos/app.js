// npm init -y
// npm install express
// Passos 01 a 12: cada rota pode ser estudada separadamente.
const express = require('express');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('API online'));
app.get('/ola', (req, res) => res.send('Olá, turma!'));
app.get('/sobre', (req, res) => res.send('Estou aprendendo APIs!'));
app.get('/contato', (req, res) => res.send('Contato: turma@exemplo.com'));
app.get('/aluno', (req, res) => res.json({ nome: 'Ana', idade: 15 }));
app.get('/frutas', (req, res) => res.json(['maçã', 'banana', 'uva']));
app.get('/soma', (req, res) => res.json({ resultado: 5 + 3 }));
app.get('/saudacao/:nome', (req, res) => {
  res.send(`Olá, ${req.params.nome}!`);
});
app.get('/boasvindas', (req, res) => {
  res.send(`Bem-vindo, ${req.query.nome || 'visitante'}`);
});

// Módulo 06: parâmetro de consulta e corpo JSON.
app.get('/buscar', (req, res) => res.json({ pesquisa: req.query.termo ?? '' }));
app.post('/eco', (req, res) => res.json({ recebido: req.body }));

if (require.main === module) {
  app.listen(PORT, () => console.log(`Exemplo inicial: http://localhost:${PORT}`));
}

module.exports = app;
