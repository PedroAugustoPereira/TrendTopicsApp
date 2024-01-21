import { Request, Response } from "express";

import { postDocument } from "../models/postModel";
import postService from "../services/postService";

const postController = {
  getPosts: async (req: Request, res: Response) => {
    try {
      const posts = await postService.findAllPosts();
      res.status(200).json({
        status: true,
        data: posts,
      });
    } catch (err: any) {
      res.status(400).json({
        status: false,
        error: err.message,
      });
    }
  },

  newPost: async (req: Request, res: Response) => {
    try {
      const {
        title,
        metaTags,
        produtoAfiliado,
        linkProduto,
        text,
        category,
        order,
        author,
        views,
        rating,
        comments,
      } = req.body;

      // Crie um objeto com apenas os campos preenchidos
      const postData: postDocument = {
        title,
        metaTags,
        produtoAfiliado,
        linkProduto,
        text,
        category,
        order,
        author,
        views,
        rating,
        comments,
      };

      // Chame a função do serviço para criar o post
      const result = await postService.createPost(postData);
      res.status(200).json({
        status: true,
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        status: false,
        error: err.message,
      });
    }
  },
};

export default postController;
