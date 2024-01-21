import express from "express";

import categoryController from "../controllers/categoryController";

const categoryRouter = express.Router();

categoryRouter.get("/categories", categoryController.getCategories);
categoryRouter.get("/category", categoryController.getCategory);

categoryRouter.post("/newCategory", categoryController.newCategory);

export default categoryRouter;
