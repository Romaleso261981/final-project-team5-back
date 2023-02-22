const createError = require("http-errors");
const constants = require("../utils/constants");

const { REQ_VALIDATION_TARGET, ERROR_MESSAGES } = constants;

const validation = (schema, validationTarget) => {
  return async (req, res, next) => {
    let validated = null;

    switch (validationTarget) {
      case REQ_VALIDATION_TARGET.QUERY:
        validated = schema.validate(req.query);
        break;
      case REQ_VALIDATION_TARGET.PARAMS:
        validated = schema.validate(req.params);
        break;
      case REQ_VALIDATION_TARGET.BODY:
        validated = schema.validate(req.body);
        break;
      default:
        throw createError(500, ERROR_MESSAGES.internalServerError);
    }

    if (validated.error) throw createError(400, validated.error.message);

    req.body = validated.value;
    next();
  };
};

module.exports = validation;
