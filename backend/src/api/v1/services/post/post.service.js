const { Account } = require("../../models/Account.model");
const { Post } = require("../../models/Post.model");

module.exports.createPostService = async (body) => {
  const { userId, image, content, status } = body;
  if (!image && !content && !status) {
    return {
      status: 400,
      message: "Bad request",
    };
  }
  const findUser = await Account.findById(userId);
  if (!findUser) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  const newPost = new Post({
    userId: userId,
    image: image,
    content: content,
    status: status,
  });
  await newPost.save();
  findUser.posts.unshift(newPost);
  await findUser.save();
  return {
    status: 201,
    message: "Thêm mới bài viết thành công",
  };
};
