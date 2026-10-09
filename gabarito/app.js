// Gabarito das 18 missões: iniciar com `npm run gabarito`.
const express = require('express');
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Missão 11: o middleware deve vir antes das rotas.
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Missões 01 e 02.
app.get('/', (req, res) => res.send('API online'));
app.get('/status', (req, res) => res.json({ online: true, curso: 'Node' }));

// Missão 16.
app.use('/produtos', require('./routes/produtos'));

// Missão 15: um erro controlado passa ao middleware de quatro parâmetros.
app.get('/erro-controlado', (req, res, next) => next(new Error('Exemplo de erro')));

app.use((req, res) => res.status(404).json({ erro: 'Rota não encontrada' }));
app.use((err, req, res, next) => {
  if (err.status === 400) return res.status(400).json({ erro: 'JSON inválido' });
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno' });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Gabarito: http://localhost:${PORT}`));
}

module.exports = app;
