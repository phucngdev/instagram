const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    roomchatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomChat",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = { Message };
