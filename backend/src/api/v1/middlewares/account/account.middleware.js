const { Account } = require("../../models/Account.model");

module.exports.checkUser = async (req, res, next) => {
  const phone = req.params.id;
  const result = Account.findOne({ phone });
  if (!result) {
    return {
      status: 404,
      message: "User không tồn tại",
    };
  }
  next();
};

module.exports.checkQuery = async (req, res, next) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: "Not query" });
  }
  next();
};
