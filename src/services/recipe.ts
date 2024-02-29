import { IRecipeRepository } from "../repositories/recipe";
import { IRecipe } from "../models/recipe";

export interface ISearchFilters {
  search?: string;
  cuisine?: string[];
  meals?: string[];
  ingredients?: string[];
}
export interface IRecipeService {
  list: (filters: ISearchFilters) => Promise<IRecipe[]> | undefined;
  create: (recipe: IRecipe) => Promise<IRecipe>;
  findById: (id: string) => Promise<IRecipe | null>;
}

export default class RecipeService implements IRecipeService {
  private _repository: IRecipeRepository;

  constructor(repository: IRecipeRepository) {
    this._repository = repository;
  }

  list = (filters: ISearchFilters) => {
    let query = {};

    if (filters.search) {
      query = { ...query, title: { $regex: filters.search, $options: "i" } };
    }
    return this._repository.list(query);
  };

  create = (recipe: IRecipe) => {
    console.log(recipe);
    return this._repository.create(recipe);
  };

  findById = (id: string) => {
    return this._repository.findById(id);
  };
}
