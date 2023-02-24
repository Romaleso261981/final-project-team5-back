const current = async (req, res, next) => {
  try {
    const { email } = req.user;
    return res.status(200).json({
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
