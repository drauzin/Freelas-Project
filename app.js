const express = require('express');
const cors = require('cors');
const app = express();

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

// CORS config
app.use(cors({
  origin: 'http://localhost:8081',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Middlewares
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);  // <- Certifique-se de usar essa rota
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});

module.exports = app;
