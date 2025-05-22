// docs/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Freelas na Cidade',
      version: '3.1.0',
      description: 'Documentação da API Freelas ',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho dos arquivos com as rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
// Para gerar a documentação, execute o seguinte comando:       
// npx swagger-jsdoc -d ./docs/swagger.js -o ./docs/swagger.json
// Para visualizar a documentação, você pode usar o Swagger UI ou qualquer outro visualizador de JSON.
// Para instalar o Swagger UI, você pode usar o seguinte comando:
// npm install swagger-ui-express   
//
// E então, no seu arquivo principal (app.js ou server.js), adicione o seguinte código:


// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./docs/swagger');
//
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Agora, você pode acessar a documentação da API em http://localhost:3000/api-docs
// Certifique-se de que o servidor esteja em execução antes de acessar a documentação.
//
// Você pode personalizar ainda mais a documentação, adicionando tags, parâmetros e exemplos nas suas rotas.
// Para mais informações, consulte a documentação do Swagger JSDoc:
// 