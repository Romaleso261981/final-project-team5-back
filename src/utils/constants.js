const TRANSACTION_TYPES = {
  ALL: "all",
  DEBIT: "debit",
  CREDIT: "credit",
};

const REQ_VALIDATION_TARGET = {
  BODY: "body",
  QUERY: "query",
  PARAMS: "params",
};

const ERROR_MESSAGES = {
  notFound: "Not found",
  internalServerError: "Internal Server error",
  missingTypeQueryString: "Missing required type query string",
  invalidTypeQueryStringFormat: "Invalid value of type query string",
  missingPeriodQueryString: "Missing required period query string",
  invalidPeriodQueryStringFormat: "Invalid value of period query string",
  missingTypeField: "Missing required type field",
  invalidTypeValue: "Invalid type field value",
  missingDateField: "Missing required date field",
  invalidDateFormat: "Invalid date field format",
  invalidDateValue: "Invalid date field value",
  missingDescriptionField: "Missing required description field",
  invalidDescriptionValue: "Invalid description field value",
  missingCategoryField: "Missing required category field",
  invalidCategoryValue: "Invalid category field value",
  missingAmountField: "Missing required amount field",
  invalidAmountValue: "Invalid amount field value",
  missingIdQueryString: "Missing required transactionId query string",
  invalidIdQueryStringFormat: "Invalid value of transactionId query string",
  invalidEmailFormat: "Invalid email format",
  missingField: "Missing required field",
  invalidValue: "Invalid value",
};

module.exports = {
  ERROR_MESSAGES,
  REQ_VALIDATION_TARGET,
  TRANSACTION_TYPES,
};
