const { Account } = require("../../models/Account.model");

module.exports.profile = async (phone) => {
  const result = await Account.findOne({ phone }).populate({
    path: "roomchat",
    select: "_id roomname", // Chỉ hiển thị _id và roomname của mỗi phòng
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
