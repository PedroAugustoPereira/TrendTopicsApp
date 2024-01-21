import mongoose from "mongoose";

export interface postDocument {
  title: string;
  metaTags: string[];
  produtoAfiliado?: string;
  linkProduto?: string;
  text: string;
  comments?: [];
  views?: number;
  rating?: number;
  category: mongoose.Schema.Types.ObjectId;
  order: number;
  author: string;
}

const postSchema = new mongoose.Schema<postDocument>(
  {
    title: {
      type: String,
      required: true,
    },

    metaTags: {
      type: [String],
      required: false,
    },

    produtoAfiliado: {
      type: String,
      required: false,
    },

    linkProduto: {
      type: String,
      required: false,
    },

    text: {
      type: String,
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentarios",
        required: false,
      },
    ],

    views: {
      type: Number,
      required: false,
    },

    rating: {
      type: Number,
      required: false,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Posts = mongoose.model("Post", postSchema);
export type PostType = typeof postSchema;

export default Posts;
