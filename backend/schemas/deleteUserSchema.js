const Joi = require('joi');

const deleteUserSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'any.required': 'O campo id é obrigatório.',
      'number.base': 'O id deve ser um número.',
      'number.integer': 'O id deve ser um número inteiro.',
      'number.positive': 'O id deve ser um número positivo.'
    })
});

module.exports = deleteUserSchema;