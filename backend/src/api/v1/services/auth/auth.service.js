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

module.exports.login = async (user) => {
  console.log(user);
  const { username, password } = user;
  // Tìm tài khoản trong cơ sở dữ liệu dựa trên username
  const findUser = await Account.findOne({ username });
  // Kiểm tra xem tài khoản có tồn tại không
  if (!username) {
    return res.status(401).json({ error: "Tên đăng nhập không tồn tại" });
  }
  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, findUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Mật khẩu không đúng" });
  }
  return {
    status: 200,
    data: {
      user: findUser,
    },
  };
};
