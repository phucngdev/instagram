const routerMessage = require("express").Router();
const mesControler = require("../../controllers/message/messageController");
const mesMiddleware = require("../../middlewares/message/message.middleware");

// gửi tin nhắn 1 vs 1
routerMessage.post(
  "/:roomId/:senderId",
  mesMiddleware.checkUserSendMes,
  mesControler.sendMesSingle
);

routerMessage.delete(
  "/deletemessage/:roomId/:messageId",
  mesMiddleware.checkUserAndMesIdAndRoonId,
  mesControler.deleteMess
);

module.exports = routerMessage;
