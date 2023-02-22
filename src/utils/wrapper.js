const wrapper = (controllerOrMiddleware) => {
  return async (req, res, next) => {
    try {
      await controllerOrMiddleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = wrapper;
