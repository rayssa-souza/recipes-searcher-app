import { Schema, model } from "mongoose";

export interface IRecipe {
  title: string;
  author: string;
  rating: number;
  viewCount: number;
  requiredEquipment: [{ name: string }];
  time: {
    prepTime: string;
    cookTime: string;
    additionalTime: string;
    totalTime: string;
    servings: number;
  };
  tips: [{ text: string }];
  ingredients: [{ text: string; ingredient: string }];
  directions: [{ text: string; timestamp: number }];
  video: string;
  image: string;
  cuisine: string;
  meals: string[];
  source: string;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true },
  viewCount: { type: Number, required: true },
  requiredEquipment: [{ name: { type: String, required: true } }],
  time: {
    prepTime: { type: String, required: true },
    cookTime: { type: String, required: true },
    additionalTime: { type: String, required: true },
    totalTime: { type: String, required: true },
    servings: { type: Number, required: true },
  },
  tips: [{ text: { type: String, required: true } }],
  ingredients: [
    {
      text: { type: String, required: true },
      ingredient: { type: String },
    },
  ],
  directions: [
    {
      text: { type: String, required: true },
      timestamp: { type: Number, required: true },
    },
  ],
  video: { type: String, required: true },
  image: { type: String, required: true },
  cuisine: [{ type: String, required: true }],
  meals: [{ type: String, required: true }],
  source: { type: String, required: true },
});

export default model<IRecipe>("Recipe", recipeSchema);
