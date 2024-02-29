"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_1 = __importDefault(require("../repositories/recipe"));
const recipe_2 = __importDefault(require("../models/recipe"));
const recipe_3 = __importDefault(require("../services/recipe"));
const recipe_4 = require("../controllers/recipe");
const router = (0, express_1.Router)();
const repository = new recipe_1.default(recipe_2.default);
const service = new recipe_3.default(repository);
const controller = new recipe_4.RecipeController(service);
router.get("/", controller.list);
router.get("/:id", controller.findById);
router.post("/", controller.create);
exports.default = router;
