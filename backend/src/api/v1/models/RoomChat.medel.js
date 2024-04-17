const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema(
  {
    roomname: {
      type: String,
      required: true,
    },
    roomAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    contentInbox: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

const RoomChat = mongoose.model("RoomChat", roomChatSchema);
module.exports = { RoomChat };
