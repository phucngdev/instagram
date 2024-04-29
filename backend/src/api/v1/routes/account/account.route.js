const routerAccount = require("express").Router();
const accountMiddle = require("../../middlewares/account/account.middleware");
const accountController = require("../../controllers/account/accountController");
routerAccount.get(
  "/:id",
  accountMiddle.checkUser,
  accountController.getDataUser
);

routerAccount.get(
  "/search/search",
  accountMiddle.checkQuery,
  accountController.searchByQuery
);

module.exports = routerAccount;
