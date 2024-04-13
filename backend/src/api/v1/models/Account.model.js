const mongoose = require("mongoose");

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
    },
    name: {
      type: Number,
    },
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
