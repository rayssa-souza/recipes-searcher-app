"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeService {
    constructor(repository) {
        this.list = (filters) => {
            let query = {};
            if (filters.search) {
                query = Object.assign(Object.assign({}, query), { title: { $regex: filters.search, $options: "i" } });
            }
            return this._repository.list(query);
        };
        this.create = (recipe) => {
            console.log(recipe);
            return this._repository.create(recipe);
        };
        this.findById = (id) => {
            return this._repository.findById(id);
        };
        this._repository = repository;
    }
}
exports.default = RecipeService;
