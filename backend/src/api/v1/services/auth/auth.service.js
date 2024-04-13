const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Account } = require("../../models/Account.model");
const { RefreshToken } = require("../../models/RefreshToken");

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

module.exports.logOut = async (user) => {
  // Clear cookies khi ng dùng đăng xuất
  // refreshTokens = refreshTokens.filter((token) => token !== user.token);
  const { token } = user;
  await RefreshToken.findOneAndDelete({ token });
  return {
    status: 200,
    message: "Logged out successfully!",
  };
};

module.exports.generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "2h" }
  );
};

module.exports.generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

module.exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("Bạn chưa đăng nhập");

    const foundToken = await RefreshToken.findOne({ token: refreshToken });
    if (!foundToken) {
      return res.status(403).json("Refresh token không hợp lệ");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.error("Lỗi xác thực refresh token:", err);
        return res.status(403).json("Refresh token không hợp lệ");
      }
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      foundToken.token = newRefreshToken;
      foundToken.save();
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
    res.status(500).json("Đã có lỗi xảy ra khi cố gắng refresh token");
  }
};
