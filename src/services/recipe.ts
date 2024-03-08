import { IRecipeRepository } from "../repositories/recipe";
import { IRecipe } from "../models/recipe";

export interface ISearchFilters {
  search?: string;
  cuisine?: string | string[];
  meals?: string | string[];
  ingredients?: string | string[];
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

    console.log(filters);

    if (filters.search) {
      query = { ...query, title: { $regex: filters.search, $options: "i" } };
    }

    if (filters.cuisine) {
      query = {
        ...query,
        cuisine: {
          $in:
            typeof filters.cuisine === "string"
              ? [filters.cuisine]
              : filters.cuisine,
        },
      };
    }
    if (filters.meals) {
      query = {
        ...query,
        meals: {
          $in:
            typeof filters.meals === "string" ? [filters.meals] : filters.meals,
        },
      };
    }
    if (filters.ingredients) {
      const allIngredientsArray: string[] =
        typeof filters.ingredients === "string"
          ? [filters.ingredients]
          : (filters.ingredients as string[]);

      query = {
        ...query,
        $or: allIngredientsArray.map((ingredient) => ({
          "ingredients.ingredient": ingredient,
        })),
      };
    }

    console.log(query);

    return this._repository.list(query);
  };

  create = (recipe: IRecipe) => {
    return this._repository.create(recipe);
  };

  findById = (id: string) => {
    return this._repository.findById(id);
  };
}
