const express = require('express');
const cors = require('cors');
const app = express();

// Importação de rotas
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

// CORS - coloque isso antes de tudo
const allowedOrigins = ['http://localhost:8081', 'https://seu-frontend-produção.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Uso das rotas
app.use('/api/users', userRoutes);
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});

module.exports = app;
