const { Account } = require("../../models/Account.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.checkphone = async (req, res, next) => {
  const { phone } = req.body;
  try {
    // Kiểm tra xem phone đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingAccount = await Account.findOne({ phone });
    if (existingAccount) {
      return res.status(400).json({ error: "phone đã tồn tại" });
    }
    // Nếu phone không tồn tại, tiếp tục đến middleware hoặc controller tiếp theo
    next();
  } catch (error) {
    console.error("Lỗi check phone:", error);
    return res.status(500).json({ error: "Bad request" });
  }
};

module.exports.verifyTokenLogin = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json("Token không hợp lệ!");
      } else {
        next();
      }
    });
  } else {
    res.status(401).json("Token không tồn tại!");
  }
};
