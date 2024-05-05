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
    return res.status(result.status).json(result);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.logOutUser = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const result = await authService.logOut(token);
    res.clearCookie("refreshToken");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getDataUserLogin = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const result = await authService.getDataUserLogin(token);
    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
