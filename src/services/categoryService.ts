import Categorys, { CategoryDocument } from "../models/categoryModel";

const categoryService = {
  findAllCategorys: async () => {
    return await Categorys.find();
  },

  createCategory: async (data: CategoryDocument) => {
    const category = await Categorys.create(data);
    return category.toJSON();
  },
};

export default categoryService;
