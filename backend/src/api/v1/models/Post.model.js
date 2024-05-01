const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    image: {
      type: String,
    },
    content: {
      type: String,
    },
    status: {
      type: String,
    },
    likes: [
      {
        account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    share: [
      {
        account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    comment: [
      {
        content: {
          type: String,
          required: true,
        },
        account: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account",
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

let Post = mongoose.model("Post", postSchema);
module.exports = { Post };
