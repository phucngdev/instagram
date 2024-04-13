const jwt = require("jsonwebtoken");
const authService = require("../../services/auth/auth.service");

module.exports.registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    const accessToken = await authService.generateAccessToken(result);
    res.status(200).json({ result: result, accessToken: accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.logOutUser = async (req, res) => {
  // Clear cookies khi ng dùng đăng xuất
  const result = await authService.logOut(req.body);
  res.clearCookie("refreshToken");
  res.status(200).json(result);
};
