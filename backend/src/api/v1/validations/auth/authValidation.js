module.exports.checkIsBody = (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({
      status: 400,
      message: "Tên đăng nhập không được để trống.",
    });
  }
  if (!password) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống.",
    });
  }
  next();
};
