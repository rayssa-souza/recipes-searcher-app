"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipeSchema = new mongoose_1.Schema({
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
    ingredients: [{ text: { type: String, required: true } }],
    directions: [
        {
            text: { type: String, required: true },
            timestamp: { type: Number, required: true },
        },
    ],
    video: { type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String, required: true },
    meals: [{ type: String, required: true }],
    source: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Recipe", recipeSchema);
