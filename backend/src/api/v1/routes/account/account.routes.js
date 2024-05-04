const routerAccount = require("express").Router();
const accountMiddle = require("../../middlewares/account/account.middleware");
const accountController = require("../../controllers/account/accountController");

// get data user
routerAccount.get(
  "/:id",
  accountMiddle.checkUser,
  accountController.getDataUser
);

// search
routerAccount.get(
  "/search/search",
  accountMiddle.checkQuery,
  accountController.searchByQuery
);

routerAccount.patch("/edit/profile/:id", accountController.editProfile);

module.exports = routerAccount;
