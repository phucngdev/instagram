const mongoose = require("mongoose");

const tokenRefresh = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

let RefreshToken = mongoose.model("RefreshToken", tokenRefresh);
module.exports = { RefreshToken };
