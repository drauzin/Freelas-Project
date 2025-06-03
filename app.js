const express = require('express');
const app = express();
const cors = require('cors');



// Importar rotas
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

//Cors

app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:19006'], // inclua todas as URLs do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middlewares
app.use(express.json());

// Rotas
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});


module.exports = app;
