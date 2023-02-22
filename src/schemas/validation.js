const Joi = require("joi");
const { TRANSACTION_TYPES, ERROR_MESSAGES } = require("../utils/constants");

const validateRegisterSchema = Joi.object({
  password: Joi.string().min(6).max(16).required(),
  email: Joi.string().email().required(),
});

const validateGetTransactionShema = Joi.object({
  type: Joi.string()
    .required()
    .trim()
    .valid(
      TRANSACTION_TYPES.DEBIT,
      TRANSACTION_TYPES.CREDIT,
      TRANSACTION_TYPES.ALL
    )
    .messages({
      "any.required": ERROR_MESSAGES.missingTypeQueryString,
      "any.only": ERROR_MESSAGES.invalidTypeQueryStringFormat,
    }),
  period: Joi.date().required().iso().messages({
    "any.required": ERROR_MESSAGES.missingPeriodQueryString,
    "date.format": ERROR_MESSAGES.invalidPeriodQueryStringFormat,
  }),
});

const validateAddTransactionShema = Joi.object({
  type: Joi.string()
    .required()
    .trim()
    .valid(TRANSACTION_TYPES.DEBIT, TRANSACTION_TYPES.CREDIT)
    .messages({
      "any.required": ERROR_MESSAGES.missingTypeField,
      "any.only": ERROR_MESSAGES.invalidTypeValue,
    }),
  date: Joi.date().iso().required().messages({
    "any.required": ERROR_MESSAGES.missingDateField,
    "date.format": ERROR_MESSAGES.invalidDateFormat,
    "date.max": ERROR_MESSAGES.invalidDateValue,
  }),
  description: Joi.string().required().trim().messages({
    "any.required": ERROR_MESSAGES.missingDescriptionField,
    "string.pattern.base": ERROR_MESSAGES.invalidDescriptionValue,
  }),
  category: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-f0-9]{24}$/)
    .messages({
      "any.required": ERROR_MESSAGES.missingCategoryField,
      "string.pattern.base": ERROR_MESSAGES.invalidCategoryValue,
    }),
  amount: Joi.number().required().positive().messages({
    "any.required": ERROR_MESSAGES.missingAmountField,
    "number.base": ERROR_MESSAGES.invalidAmountValue,
    "number.positive": ERROR_MESSAGES.invalidAmountValue,
  }),
});

const validateDeleteTransactionShema = Joi.object({
  financeId: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-f0-9]{24}$/)
    .messages({
      "any.required": ERROR_MESSAGES.missingIdQueryString,
      "string.pattern.base": ERROR_MESSAGES.invalidIdQueryStringFormat,
    }),
});

module.exports = {
  validateRegisterSchema,
  validateGetTransactionShema,
  validateAddTransactionShema,
  validateDeleteTransactionShema,
};
