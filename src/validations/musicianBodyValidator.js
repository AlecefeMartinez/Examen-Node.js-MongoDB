const Joi = require("joi")

const bodySchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
  lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
  instrument: Joi.string().required(),
  orchestra: Joi.string().required()
})

const paramsSchema = Joi.object({
  id: Joi.string().alphanum().max(24).required()
})

const querySchema = Joi.alternatives().try(
  Joi.object({
    firstName: Joi.string().required()
  }),
  Joi.object({
    lastName: Joi.string().required()
  }),
  Joi.object({
    instrument: Joi.string().required()
  }),
  Joi.object({
    orchestra: Joi.string().required()
  }),
  Joi.object({})
)

module.exports = { bodySchema, paramsSchema, querySchema }
