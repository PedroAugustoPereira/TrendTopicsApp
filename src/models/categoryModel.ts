import mongoose from "mongoose";

export interface CategoryDocument {
  name: string;
  slug: string;
  posts?: [];
}

export const categorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Categorys = mongoose.model<CategoryDocument>("Categorys", categorySchema);
export type CategoryType = typeof categorySchema;

export default Categorys;
