const routerAccount = require("express").Router();
const accountMiddle = require("../../middlewares/account/account.middleware");
const accountController = require("../../controllers/account/accountController");
routerAccount.get(
  "/:id",
  accountMiddle.checkUser,
  accountController.getDataUser
);
// cbi loại bỏ
// routerAccount.get("/inbox/:id", accountController.getInboxUser);
// routerAccount.post("/inbox", accountController.sendInboxUser);

module.exports = routerAccount;
