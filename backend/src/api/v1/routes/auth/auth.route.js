const registerMiddleware = require("../../middlewares/auth/auth.middleware");
const authController = require("../../controllers/auth/authController");
const routerAuth = require("express").Router();

// đăng ký
routerAuth.post(
  "/register",
  registerMiddleware.checkUsername,
  authController.registerUser
);

// đăng nhập
routerAuth.post("/login");

// đăng xuất
routerAuth.post("/logout");

module.exports = routerAuth;
