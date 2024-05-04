const { Post } = require("../../models/Post.model");
const postService = require("../../services/post/post.service");

module.exports.createPost = async (req, res) => {
  try {
    const result = await postService.createPostService(req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Lỗi server");
  }
};

module.exports.newFeed = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await postService.newFeedService(userId);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Error fetching new posts:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
