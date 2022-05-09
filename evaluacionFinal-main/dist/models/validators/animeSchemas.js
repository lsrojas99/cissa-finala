"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimeSchema = exports.createAnimeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createAnimeSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    published: joi_1.default.date().required(),
    duration: joi_1.default.number().required(),
    year: joi_1.default.number().required(),
    type: joi_1.default.string().required(),
    episodes: joi_1.default.number().required(),
    photo: joi_1.default.string().uri()
});
exports.updateAnimeSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    status: joi_1.default.string().required(),
    published: joi_1.default.date().required(),
    duration: joi_1.default.number().required(),
    year: joi_1.default.number().required(),
    type: joi_1.default.string().required(),
    episodes: joi_1.default.number().required(),
    photo: joi_1.default.string().uri()
});
