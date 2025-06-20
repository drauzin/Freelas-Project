const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email inválido.',
      'string.empty': 'Preencha todos os dados corretamente.',
      'any.required': 'Preencha todos os dados corretamente.',
    }),
    
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'A senha deve ter no mínimo 6 caracteres.',
      'string.empty': 'Preencha todos os dados corretamente.',
      'any.required': 'Preencha todos os dados corretamente.',
    }),
});

module.exports = loginSchema;
