"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
class RecipeController {
    constructor(service) {
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this._service.list(req.query);
            return res.status(200).json(response);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const createRecipe = req.body;
            const response = yield this._service.create(createRecipe);
            return res.status(201).json(response);
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const recipeId = req.params.id;
            const response = yield this._service.findById(recipeId);
            return res.status(200).json(response);
        });
        this._service = service;
    }
}
exports.RecipeController = RecipeController;
