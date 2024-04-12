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
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
