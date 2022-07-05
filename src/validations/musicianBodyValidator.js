const Joi = require('joi')

const schema = Joi.object(
  {
    firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
    lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
    instrument: Joi.string().required(),
    orchestra: Joi.string().required()
  }
)

module.exports = schema
