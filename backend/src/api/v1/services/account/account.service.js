const { Account } = require("../../models/Account.model");

module.exports.profile = async (username) => {
  const result = await Account.findOne({ username }).populate({
    path: "posts",
    select: "_id image status content likes comment createdAt",
  });
  return {
    status: 200,
    result: result,
  };
};

// tìm kiếm user
module.exports.searchService = async (searchString) => {
  // "i" để không phân biệt chữ hoa chữ thường
  const regex = await new RegExp(searchString, "i");
  // Tìm người dùng theo điều kiện phone hoặc username
  const users = await Account.find({
    $or: [{ phone: regex }, { username: regex }],
  });

  if (users.length > 0) {
    return {
      status: 200,
      users: users,
    };
  } else {
    return {
      status: 404,
      message: "Search not found",
    };
  }
};

// edit profile
module.exports.editProfileService = async (userId, body) => {
  const { username, name, bio, gender } = body;
  console.log(name);
  const findUser = await Account.findByIdAndUpdate(
    userId,
    { $set: { username: username, name: name, bio: bio, gender: gender } },
    { new: true }
  );
  if (!findUser) {
    return {
      status: 404,
      message: "User not found",
    };
  }
  return {
    status: 200,
    message: "Update success",
    user: findUser,
  };
};
