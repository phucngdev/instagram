const { Account } = require("../../models/Account.model");

module.exports.checkUser = async (req, res, next) => {
  const username = req.params.id;
  const result = Account.findOne({ username });
  if (!result) {
    return {
      status: 404,
      message: "User không tồn tại",
    };
  }
  next();
};
