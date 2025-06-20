const express = require('express');
const cors = require('cors');
<<<<<<< HEAD:backend/app.js
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');


import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173", // ou "*", se estiver em dev
  credentials: true // se usar cookies
}));

// Middlewares
=======
const app = express();

const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

const allowedOrigins = ['http://localhost:8081'];

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

>>>>>>> 81061b52190e39306cbe51d5e921e88e234e439e:app.js
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});

module.exports = app;
