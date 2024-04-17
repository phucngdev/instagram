const { Account } = require("../../models/Account.model");

module.exports.profile = async (username) => {
  const result = await Account.findOne({ username }).populate("roomchat");
  console.log(result);
  return {
    status: 200,
    result: result,
  };
};

module.exports.getInbox = async (username) => {
  const user = await Account.findOne({ username }).populate({
    path: "inbox.contentInbox",
    populate: {
      path: "sender",
      select: "username avatar",
    },
  });
  if (!user) {
    return;
    // return res.status(404).json({ message: "User not found" });
  }
  return {
    inbox: user.inbox,
  };
};
