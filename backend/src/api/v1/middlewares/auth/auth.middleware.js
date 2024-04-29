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
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Token không tồn tại!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("Token không tồn tại!");
  }
};
