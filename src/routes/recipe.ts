import { Router } from "express";
import RecipeRepository from "../repositories/recipe";
import RecipeModel from "../models/recipe";
import RecipeService from "../services/recipe";
import { RecipeController } from "../controllers/recipe";

const router = Router();

const repository = new RecipeRepository(RecipeModel);
const service = new RecipeService(repository);
const controller = new RecipeController(service);

router.get("/", controller.list);
router.get("/:id", controller.findById);
router.post("/", controller.create);

export default router;
