const express = require('express');
const app = express();

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

// Middlewares
app.use(express.json());

// Rotas
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});

module.exports = app;
