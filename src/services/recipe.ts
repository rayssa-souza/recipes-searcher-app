import { IRecipeRepository } from "../repositories/recipe";
import { IRecipe } from "../models/recipe";

export interface IQuery {
  search?: string;
  cuisine?: string | string[];
  meals?: string | string[];
  ingredients?: string | string[];
  page?: string | undefined;
}

export interface IRecipeService {
  list: (query: IQuery) => Promise<IRecipe[]> | undefined;
  create: (recipe: IRecipe) => Promise<IRecipe>;
  findById: (id: string) => Promise<IRecipe | null>;
}

export default class RecipeService implements IRecipeService {
  private _repository: IRecipeRepository;

  constructor(repository: IRecipeRepository) {
    this._repository = repository;
  }

  list = (query: IQuery) => {
    let filters = {};
    const pageSize = 1;
    let pagination = { skip: 0, limit: pageSize };

    const page = query.page === undefined ? 1 : parseInt(query.page);

    pagination = {
      ...pagination,
      skip: page === 1 ? 0 : (page - 1) * pageSize,
    };

    if (query.search) {
      filters = { ...filters, title: { $regex: query.search, $options: "i" } };
    }

    if (query.cuisine) {
      filters = {
        ...filters,
        cuisine: {
          $in:
            typeof query.cuisine === "string" ? [query.cuisine] : query.cuisine,
        },
      };
    }
    if (query.meals) {
      filters = {
        ...filters,
        meals: {
          $in: typeof query.meals === "string" ? [query.meals] : query.meals,
        },
      };
    }
    if (query.ingredients) {
      const allIngredientsArray: string[] =
        typeof query.ingredients === "string"
          ? [query.ingredients]
          : (query.ingredients as string[]);

      filters = {
        ...filters,
        $or: allIngredientsArray.map((ingredient) => ({
          "ingredients.ingredient": ingredient,
        })),
      };
    }

    return this._repository.list(filters, pagination);
  };

  create = (recipe: IRecipe) => {
    return this._repository.create(recipe);
  };

  findById = (id: string) => {
    return this._repository.findById(id);
  };
}
