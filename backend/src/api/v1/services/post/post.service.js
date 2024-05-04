const { Account } = require("../../models/Account.model");
const { Post } = require("../../models/Post.model");

module.exports.createPostService = async (body) => {
  const { author, image, content, status } = body;
  if (!image && !content && !status) {
    return {
      status: 400,
      message: "Bad request",
    };
  }
  const findUser = await Account.findById(author);
  if (!findUser) {
    return {
      status: 404,
      message: "user not found",
    };
  }
  const newPost = new Post({
    author: author,
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

module.exports.newFeedService = async (userId) => {
  // Lấy thông tin của người dùng từ ID
  const user = await Account.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  // Lấy danh sách người dùng mà người dùng hiện tại đang theo dõi
  const following = user.following;
  // Lấy các bài đăng mới nhất từ các người dùng mà người dùng hiện tại đang theo dõi
  const newestPosts = await Post.find({ author: { $in: following } })
    .sort({ createdAt: -1 })
    .limit(10);
  // Nếu không có bài đăng nào từ các người dùng mà người dùng hiện tại đang theo dõi,
  // Lấy số lượng bài đăng có số lượt like cao từ các người dùng mà người dùng hiện tại đang theo dõi
  const additionalPosts = await Post.aggregate([
    {
      $match: {
        author: { $in: following },
        _id: { $nin: newestPosts.map((post) => post._id) },
      },
    }, // Lọc các bài đăng của các người dùng mà người dùng đang theo dõi và không nằm trong newestPosts
    { $sort: { likes: -1 } }, // Sắp xếp theo số lượt like giảm dần
    { $limit: 10 - newestPosts.length }, // Giới hạn số lượng bài đăng trả về
  ]);
  newestPosts.concat(additionalPosts);
  // thì lấy một số bài đăng mới nhất từ cơ sở dữ liệu
  if (newestPosts.length === 0) {
    const randomPosts = await Post.aggregate([{ $sample: { size: 10 } }]);
    return {
      status: 200,
      newfeed: randomPosts,
    };
  }
  return {
    status: 200,
    newfeed: newestPosts,
  };
};
