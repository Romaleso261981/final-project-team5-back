const Joi = require("joi");

const validateRegisterSchema = Joi.object({
  password: Joi.string().min(6).max(16).required(),
  email: Joi.string().email().required(),
});

module.exports = validateRegisterSchema;
