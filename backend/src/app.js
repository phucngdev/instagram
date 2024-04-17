const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routerAuth = require("./api/v1/routes/auth/auth.route");
const routerAccount = require("./api/v1/routes/account/account.route");
const routerMessage = require("./api/v1/routes/message/message.route");
const routerRoomChat = require("./api/v1/routes/roomchat/room.route");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route
// xác thưc
app.use("/api/v1/auth", routerAuth);
// tin nhắn
app.use("/api/v1/direct", routerMessage);
// phòng chat
app.use("/api/v1/roomchat", routerRoomChat);
// tài khoản
app.use("/api/v1/accounts", routerAccount);

module.exports = app;
