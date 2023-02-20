const current = async (req, res, next) => {
  try {
    const { email } = req.user;
    res.json({
      status: "success",
      code: 200,
      user: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
