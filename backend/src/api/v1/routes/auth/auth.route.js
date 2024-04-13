const authMiddleware = require("../../middlewares/auth/auth.middleware");
const authController = require("../../controllers/auth/authController");
const authValidation = require("../../validations/auth/authValidation");
const routerAuth = require("express").Router();

// đăng ký
routerAuth.post(
  "/register",
  authValidation.checkIsBody,
  authMiddleware.checkUsername,
  authController.registerUser
);

// đăng nhập
routerAuth.post("/login", authValidation.checkIsBody, authController.loginUser);

// đăng xuất
routerAuth.post("/logout", authController.logOutUser);

module.exports = routerAuth;
