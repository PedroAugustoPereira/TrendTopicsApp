import mongoose from "mongoose";

export interface CategoryDocument {
  name: string;
  slug: string;
  posts?: mongoose.Types.ObjectId[];
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

const Categorys = mongoose.model<CategoryDocument>("Category", categorySchema);
export type CategoryType = typeof categorySchema;

export default Categorys;
