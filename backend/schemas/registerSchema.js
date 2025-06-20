const Joi = require('joi');

const registerSchema = Joi.object({
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

module.exports = registerSchema;