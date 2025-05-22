const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger'); 
const userRoutes = require('./routes/userRoutes');  // rotas de usuário
const offerRoutes = require('./routes/offerRoutes'); // se quiser usar

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API montadas em /api
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes); // se usar

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
