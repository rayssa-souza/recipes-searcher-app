"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RecipeRepository {
    constructor(model) {
        this.list = (query) => {
            return this._model.find(query);
        };
        this.create = (recipe) => {
            return this._model.create(recipe);
        };
        this.findById = (id) => {
            return this._model.findById(id).exec();
        };
        this._model = model;
    }
}
exports.default = RecipeRepository;
