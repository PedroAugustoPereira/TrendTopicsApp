import { Request, Response } from "express";

import categoryService from "../services/categoryService";

const categoryController = {
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.findAllCategorys();
      res.status(200).json({
        status: true,
        data: categories,
      });
    } catch (err: any) {
      res.status(400).json({
        status: false,
        error: err.message,
      });
    }
  },

  newCategory: async (req: Request, res: Response) => {
    const { name, slug } = req.body;

    try {
      if (typeof name !== "string" || typeof slug !== "string") {
        throw new Error("Nome ou Slug são inválidos");
      }

      const category = await categoryService.createCategory({ name, slug });
      res.status(200).json({
        status: true,
        data: category,
      });
    } catch (err: any) {
      res.status(400).json({
        status: false,
        error: err.message,
      });
    }
  },
};

export default categoryController;
