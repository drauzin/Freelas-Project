const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');


import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173", // ou "*", se estiver em dev
  credentials: true // se usar cookies
}));

// Middlewares
app.use(express.json());

// Rotas
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});


module.exports = app;
