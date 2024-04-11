const mongoose = require("mongoose");

const storiesSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
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
    // Thêm một trường để chỉ ra trạng thái của story
    isExpired: {
      type: Boolean,
      default: false,
    },
    // Thêm một trường để lưu thời gian hết hạn của story
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Hook để cập nhật trạng thái của story khi hết thời gian
storiesSchema.pre("save", function (next) {
  if (this.expireAt && this.expireAt <= new Date()) {
    this.isExpired = true;
  }
  next();
});

let Stories = mongoose.model("Stories", storiesSchema);
module.exports = { Stories };
