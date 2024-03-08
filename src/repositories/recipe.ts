import { Model } from "mongoose";
import { IRecipe } from "../models/recipe";

export interface ISearchFiltersDB {
  title?: string;
  cuisine?: string;
  meals?: string[];
  ingredients?: string[];
}

export interface IRecipeRepository {
  list: (filters: ISearchFiltersDB) => Promise<IRecipe[]> | undefined;
  create: (recipe: IRecipe) => Promise<IRecipe>;
  findById: (id: string) => Promise<IRecipe | null>;
}

export default class RecipeRepository implements IRecipeRepository {
  private _model: Model<IRecipe>;

  constructor(model: Model<IRecipe>) {
    this._model = model;
  }

  list = (query: ISearchFiltersDB) => {
    return this._model.find(query);
  };

  create = (recipe: IRecipe) => {
    return this._model.create(recipe);
  };
  findById = (id: string) => {
    return this._model.findById(id).exec();
  };
}
