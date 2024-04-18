const { Account } = require("../../models/Account.model");

module.exports.findUserById = async (id) => {
  const findUser = await Account.findById(id);
  if (!findUser) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  return {
    findUser: findUser,
  };
};
