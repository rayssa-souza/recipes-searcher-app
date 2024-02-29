import express, { Request, Response } from "express";
import { IRecipeService } from "../services/recipe";
import { IRecipe } from "../models/recipe";

export interface IRecipeController {
  list: (req: Request, res: Response) => Promise<Response>;
  create: (req: Request, res: Response) => Promise<Response>;
  findById: (req: Request, res: Response) => Promise<Response>;
}

export class RecipeController implements IRecipeController {
  private _service: IRecipeService;

  constructor(service: IRecipeService) {
    this._service = service;
  }

  list = async (req: Request, res: Response) => {
    const response = await this._service.list(req.query);
    return res.status(200).json(response);
  };

  create = async (req: Request, res: Response) => {
    const createRecipe: IRecipe = req.body;
    console.log(createRecipe);
    const response = await this._service.create(createRecipe);
    return res.status(201).json(response);
  };

  findById = async (req: Request, res: Response) => {
    const recipeId: string = req.params.id;
    const response = await this._service.findById(recipeId);
    return res.status(200).json(response);
  };
}
