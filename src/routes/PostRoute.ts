import express from "express";

import postController from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/posts", postController.getPosts);
postRouter.post("/newPost", postController.newPost);

export default postRouter;
