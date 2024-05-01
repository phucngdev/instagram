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
