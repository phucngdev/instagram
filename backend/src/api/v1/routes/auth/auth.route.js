const registerMiddleware = require("../../middlewares/auth/auth.middleware");
const authController = require("../../controllers/auth/authController");
const authValidation = require("../../validations/auth/authValidation");
const routerAuth = require("express").Router();

// đăng ký
routerAuth.post(
  "/register",
  authValidation.checkIsBody,
  registerMiddleware.checkUsername,
  authController.registerUser
);

// đăng nhập
routerAuth.post("/login", authValidation.checkIsBody, authController.loginUser);

// đăng xuất
routerAuth.post("/logout");

module.exports = routerAuth;
