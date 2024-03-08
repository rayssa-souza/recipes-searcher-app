"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeService {
    constructor(repository) {
        this.list = (filters) => {
            let query = {};
            console.log(filters);
            if (filters.search) {
                query = Object.assign(Object.assign({}, query), { title: { $regex: filters.search, $options: "i" } });
            }
            if (filters.cuisine) {
                query = Object.assign(Object.assign({}, query), { cuisine: {
                        $in: typeof filters.cuisine === "string"
                            ? [filters.cuisine]
                            : filters.cuisine,
                    } });
            }
            if (filters.meals) {
                query = Object.assign(Object.assign({}, query), { meals: {
                        $in: typeof filters.meals === "string" ? [filters.meals] : filters.meals,
                    } });
            }
            if (filters.ingredients) {
                const allIngredientsArray = typeof filters.ingredients === "string"
                    ? [filters.ingredients]
                    : filters.ingredients;
                query = Object.assign(Object.assign({}, query), { $or: allIngredientsArray.map((ingredient) => ({
                        "ingredients.ingredient": ingredient,
                    })) });
            }
            console.log(query);
            return this._repository.list(query);
        };
        this.create = (recipe) => {
            return this._repository.create(recipe);
        };
        this.findById = (id) => {
            return this._repository.findById(id);
        };
        this._repository = repository;
    }
}
exports.default = RecipeService;
