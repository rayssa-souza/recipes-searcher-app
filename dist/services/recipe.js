"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeService {
    constructor(repository) {
        this.list = (query) => {
            let filters = {};
            const pageSize = 1;
            let pagination = { skip: 0, limit: pageSize };
            const page = query.page === undefined ? 1 : parseInt(query.page);
            pagination = Object.assign(Object.assign({}, pagination), { skip: page === 1 ? 0 : (page - 1) * pageSize });
            if (query.search) {
                filters = Object.assign(Object.assign({}, filters), { title: { $regex: query.search, $options: "i" } });
            }
            if (query.cuisine) {
                filters = Object.assign(Object.assign({}, filters), { cuisine: {
                        $in: typeof query.cuisine === "string" ? [query.cuisine] : query.cuisine,
                    } });
            }
            if (query.meals) {
                filters = Object.assign(Object.assign({}, filters), { meals: {
                        $in: typeof query.meals === "string" ? [query.meals] : query.meals,
                    } });
            }
            if (query.ingredients) {
                const allIngredientsArray = typeof query.ingredients === "string"
                    ? [query.ingredients]
                    : query.ingredients;
                filters = Object.assign(Object.assign({}, filters), { $or: allIngredientsArray.map((ingredient) => ({
                        "ingredients.ingredient": ingredient,
                    })) });
            }
            return this._repository.list(filters, pagination);
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
