
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



const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.pattern.base': 'O nome deve conter apenas letras e espaços.',
      'string.empty': 'Preencha todos dados corretamente.',
      'any.required': 'Preencha todos dados corretamente.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido.',
      'string.empty': 'Preencha todos dados corretamente.',
      'any.required': 'Preencha todos dados corretamente.',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'A senha deve ter no mínimo 6 caracteres.',
      'string.empty': 'Preencha todos dados corretamente.',
      'any.required': 'Preencha todos dados corretamente.',
    }),
});
module.exports = offerSchema;
