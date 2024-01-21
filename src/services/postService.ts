import Categorys from "../models/categoryModel";
import Posts, { postDocument } from "../models/postModel";

const postService = {
  findAllPosts: async () => {
    return await Posts.find();
  },

  createPost: async (data: postDocument) => {
    const categoryExists = await Categorys.findById(data.category);
    if (!categoryExists) {
      throw new Error("Categoria não encontrada");
    }

    const post = await Posts.create(data);
    categoryExists.posts?.push(post._id);
    await categoryExists.save();

    return post.toJSON();
  },
};

export default postService;
