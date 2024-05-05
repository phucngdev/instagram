const { Account } = require("../../models/Account.model");
const { Post } = require("../../models/Post.model");
const authController = require(".././../controllers/auth/authController");

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

  await module.exports.newFeedService(author);
  await authController.getDataUserLogin();

  return {
    status: 201,
    message: "Thêm mới bài viết thành công",
  };
};

// module.exports.newFeedService = async (userId) => {
//   // Lấy thông tin của người dùng từ ID
//   const user = await Account.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }
//   // Lấy danh sách người dùng mà người dùng hiện tại đang theo dõi
//   const following = user.following;
//   // Lấy các bài đăng mới nhất từ các người dùng mà người dùng hiện tại đang theo dõi
//   let newestPosts = await Post.find({ author: { $in: following } })
//     .sort({ createdAt: -1 })
//     .limit(10)
//     .populate({
//       path: "author",
//       select: "_id username avatar bio posts followers following",
//     });

//   // Nếu không có bài đăng nào từ các người dùng mà người dùng hiện tại đang theo dõi,
//   // Lấy số lượng bài đăng có số lượt like cao từ các người dùng mà người dùng hiện tại đang theo dõi
//   if (newestPosts.length < 10) {
//     const additionalPosts = await Post.find({
//       author: { $in: following },
//       _id: { $nin: newestPosts.map((post) => post._id) },
//     })
//       .sort({ likes: -1 })
//       .limit(10 - newestPosts.length)
//       .populate({
//         path: "author",
//         select: "_id username avatar bio posts followers following",
//       }); // Chỉ lấy _id và username của tác giả
//     newestPosts = newestPosts.concat(additionalPosts);
//   }
//   // Nếu không có bài đăng nào từ các người dùng mà người dùng hiện tại đang theo dõi,
//   // thì lấy một số bài đăng ngẫu nhiên từ cơ sở dữ liệu
//   if (newestPosts.length === 0) {
//     const randomPosts = await Post.aggregate([{ $sample: { size: 10 } }]);
//     const populatedRandomPosts = await Post.populate(randomPosts, {
//       path: "author",
//       select: "_id username avatar bio posts followers following",
//     });
//     return {
//       status: 200,
//       newfeed: populatedRandomPosts,
//     };
//   }
//   return {
//     status: 200,
//     newfeed: newestPosts,
//   };
// };
module.exports.newFeedService = async (userId) => {
  // Lấy thông tin của người dùng từ ID
  const user = await Account.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  // Lấy danh sách người dùng mà người dùng hiện tại đang theo dõi
  const following = user.following;
  // Lấy các bài đăng mới nhất từ các người dùng mà người dùng hiện tại đang theo dõi
  let newestPosts = await Post.find({ author: { $in: following } })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate({
      path: "author",
      select: "_id username avatar bio posts followers following",
    });
  // Nếu không có bài đăng nào từ các người dùng mà người dùng hiện tại đang theo dõi,
  // Lấy số lượng bài đăng có số lượt like cao từ các người dùng mà người dùng hiện tại đang theo dõi
  if (newestPosts.length < 10) {
    const additionalPosts = await Post.find({
      author: { $in: following },
      _id: { $nin: newestPosts.map((post) => post._id) },
    })
      .sort({ likes: -1 })
      .limit(10 - newestPosts.length)
      .populate({
        path: "author",
        select: "_id username avatar bio posts followers following",
      }); // Chỉ lấy _id và username của tác giả
    newestPosts = additionalPosts.concat(newestPosts); // Thêm bài viết mới vào đầu danh sách
  }
  // Nếu không có bài đăng nào từ các người dùng mà người dùng hiện tại đang theo dõi,
  // thì lấy một số bài đăng ngẫu nhiên từ cơ sở dữ liệu
  if (newestPosts.length === 0) {
    const randomPosts = await Post.aggregate([{ $sample: { size: 10 } }]);
    const populatedRandomPosts = await Post.populate(randomPosts, {
      path: "author",
      select: "_id username avatar bio posts followers following",
    });
    return {
      status: 200,
      newfeed: populatedRandomPosts,
    };
  }
  return {
    status: 200,
    newfeed: newestPosts,
  };
};
