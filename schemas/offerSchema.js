// schemas/offerSchema.js
const Joi = require('joi');

const offerSchema = Joi.object({
  title: Joi.string()
    .min(10)               // Podemos alterar aqui o minimo 
    .max(255)             // e o maximo de caracteres.
    .required()
    .messages({
      'string.min': 'O título deve ter no mínimo 10 caracteres.',
      'string.empty': 'O título é obrigatório.',
      // ...
    }),

  description: Joi.string()
    .min(15)              // Aqui tambem podemos alterar o minimo 
    .max(255)            // e o maximo de caracteres.
    .required()
    .messages({
      'string.min': 'A descrição deve ter no mínimo 15 caracteres.',
      'string.empty': 'A descrição é obrigatória.',
    
    }),

});

module.exports = offerSchema;
