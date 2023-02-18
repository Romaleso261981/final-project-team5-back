const { User } = require("../../schemas/user");

const deleteUser = async (req, res, next) => {
  try {
      const { _id } = req.user;
      console.log(_id)
    const response = await User.findByIdAndDelete(_id);
    if (!response) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      status: "success",
      code: 200,
      message: "User deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = deleteUser;
