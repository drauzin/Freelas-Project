require('dotenv').config();
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger'); 
const userRoutes = require('./routes/userRoutes');
const offerRoutes = require('./routes/offerRoutes');

// Adiciona suporte para JSON no corpo das requisições
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API montadas em /api
app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('API FREELAS ONLINE.');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
