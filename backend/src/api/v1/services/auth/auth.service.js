const bcrypt = require("bcrypt");
const { Account } = require("../../models/Account.model");

module.exports.register = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password, salt);
  // tạo mới user
  const newAccount = await new Account({
    username: user.username,
    password: hashed,
  });
  // lưu vào db
  const account = await newAccount.save();
  return {
    status: 201,
    message: "Đăng ký thành công",
  };
};
