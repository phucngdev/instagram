const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Account } = require("../../models/Account.model");
const { RefreshToken } = require("../../models/RefreshToken");

module.exports.register = async (user) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(user.password.trim(), salt);
  // tạo mới user
  const newAccount = await new Account({
    phone: user.phone.trim(),
    password: hashed,
  });
  // lưu vào db
  const result = await newAccount.save();
  return {
    status: 201,
    message: "Đăng ký thành công",
    result: result,
  };
};

module.exports.login = async (req) => {
  const { phone, password } = req;
  // Tìm tài khoản trong cơ sở dữ liệu dựa trên phone
  const findUser = await Account.findOne({ phone: phone.trim() });
  // Kiểm tra xem tài khoản có tồn tại không
  if (!findUser) {
    return {
      status: 401,
      message: "Tên đăng nhập không tồn tại",
    };
  }
  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(
    password.trim(), // loại bỏ dấu cách thừa ở đầu cuối
    findUser.password
  );
  if (!isPasswordValid) {
    return {
      status: 401,
      message: "Lỗi đăng nhập",
    };
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
      phone: user.phone,
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
