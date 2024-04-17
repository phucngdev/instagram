const mongoose = require("mongoose");
const { RoomChat } = require("./RoomChat.medel");

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 200,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
    },
    name: {
      type: String,
    },
    roomchat: [{ type: mongoose.Schema.Types.ObjectId, ref: "RoomChat" }],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    stories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stories",
      },
    ],
    status: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      default: "Nam",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

let Account = mongoose.model("Account", accountSchema);
module.exports = { Account };
