const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    roomchatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomChat",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = { Message };
