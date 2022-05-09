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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimeRepository_1 = __importDefault(require("../models/repositories/AnimeRepository"));
const animeSchemas_1 = require("../models/validators/animeSchemas");
class AnimeController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const repository = new AnimeRepository_1.default(user.sub);
            try {
                const anime = yield repository.findAll();
                res.json(anime);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Someting went wrong' });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const repository = new AnimeRepository_1.default(user.sub);
            const anime = yield repository.findById(parseInt(id));
            if (!anime) {
                res.status(404).json({ message: 'Anime not found' });
                return;
            }
            res.json(anime);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const anime = req.body;
            try {
                yield animeSchemas_1.createAnimeSchema.validateAsync(anime);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            const user = req.user;
            const repository = new AnimeRepository_1.default(user.sub);
            try {
                const newAnime = yield repository.create(anime);
                res.json(newAnime);
            }
            catch (error) {
                if (error.code == 'P2002') {
                    res.status(409).json({ message: 'Anime already exists' });
                    return;
                }
                console.log(error);
                console.log('error code', error.code);
                res.status(500).json({ message: 'Someting went wrong' });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const anime = req.body;
            try {
                yield animeSchemas_1.updateAnimeSchema.validateAsync(anime);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            const user = req.user;
            const repository = new AnimeRepository_1.default(user.sub);
            try {
                yield repository.update(parseInt(id), anime);
            }
            catch (error) {
                if (error.code == 'P2002') {
                    res.status(409).json({ message: 'Anime already exists' });
                    return;
                }
                console.log(error);
                console.log('error code', error.code);
                res.status(500).json({ message: 'Someting went wrong' });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const repository = new AnimeRepository_1.default(user.sub);
            try {
                yield repository.delete(parseInt(id));
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error);
                console.log('Error code', error.code);
                res.status(500).json({ message: 'Someting went wrong' });
            }
        });
    }
}
exports.default = AnimeController;
