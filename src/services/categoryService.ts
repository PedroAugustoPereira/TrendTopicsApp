import mongoose from "mongoose";

import Categorys, { CategoryDocument } from "../models/categoryModel";

const categoryService = {
  findAllCategorys: async () => {
    return await Categorys.find();
  },

  createCategory: async (data: CategoryDocument) => {
    const category = await Categorys.create(data);
    return category.toJSON();
  },

  getCategoryWithPosts: async (categoryId: string) => {
    const categoryWithPosts = await Categorys.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(categoryId) } }, // Converte a string para ObjectId
      {
        $lookup: {
          from: "posts", // Nome da coleção de posts
          localField: "posts", // Campo na coleção de categorias
          foreignField: "_id", // Campo na coleção de posts
          as: "posts", // Nome do campo para os posts agregados
        },
      },
    ]);

    // categoryWithPosts é um array, e pode conter mais de um elemento se houver correspondências
    // Neste exemplo, assumimos que há apenas um elemento ou nenhum (se não houver correspondência)
    return categoryWithPosts[0] || null;
  },
};

export default categoryService;
