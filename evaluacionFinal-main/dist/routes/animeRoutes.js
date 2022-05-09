"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AnimeController_1 = __importDefault(require("../controllers/AnimeController"));
const animeRoutes = (0, express_1.Router)();
const controller = new AnimeController_1.default();
animeRoutes.get('/', controller.getAll);
animeRoutes.get('/:id', controller.getById);
animeRoutes.get('/', controller.create);
animeRoutes.get('/:id', controller.update);
animeRoutes.get('/:id', controller.delete);
exports.default = animeRoutes;
