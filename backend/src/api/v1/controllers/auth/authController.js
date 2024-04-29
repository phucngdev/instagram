const jwt = require("jsonwebtoken");
const authService = require("../../services/auth/auth.service");

module.exports.registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    if (result?.status === 200) {
      const accessToken = await authService.generateAccessToken(
        result.data.user
      );
      return res
        .status(result.status)
        .json({ result: result, accessToken: accessToken });
    }
    return res.status(result.status).json({ result: result });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.logOutUser = async (req, res) => {
  // Clear cookies khi ng dùng đăng xuất
  const result = await authService.logOut(req.body);
  res.clearCookie("refreshToken");
  return res.status(200).json(result);
};
