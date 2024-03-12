import { Model } from "mongoose";
import { IRecipe } from "../models/recipe";

export interface IQueryDB {
  search?: string;
  cuisine?: string | string[];
  meals?: string | string[];
  ingredients?: string | string[];
  page?: string | undefined;
}

export interface IPaginationDB {
  skip: number;
  limit: number;
}

export interface IRecipeRepository {
  list: (
    filters: IQueryDB,
    pagination: IPaginationDB
  ) => Promise<IRecipe[]> | undefined;
  create: (recipe: IRecipe) => Promise<IRecipe>;
  findById: (id: string) => Promise<IRecipe | null>;
}

export default class RecipeRepository implements IRecipeRepository {
  private _model: Model<IRecipe>;

  constructor(model: Model<IRecipe>) {
    this._model = model;
  }

  list = (query: IQueryDB, pagination: IPaginationDB) => {
    console.log(query);
    console.log(pagination);
    return this._model
      .find(query)
      .skip(pagination.skip)
      .limit(pagination.limit);
  };

  create = (recipe: IRecipe) => {
    return this._model.create(recipe);
  };
  findById = (id: string) => {
    return this._model.findById(id).exec();
  };
}
