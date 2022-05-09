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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AnimeRepository {
    constructor(userId) {
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const anime = yield prisma.anime.findMany({
                where: {
                    userId: this.userId
                }
            });
            return anime;
        });
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            const anime = yield prisma.anime.findFirst({
                where: {
                    id,
                    userId: this.userId
                }
            });
            if (!anime)
                return;
            return anime;
        });
        this.create = (anime) => __awaiter(this, void 0, void 0, function* () {
            const newAnime = yield prisma.anime.create({
                data: Object.assign(Object.assign({}, anime), { userId: this.userId, published: new Date(anime.published).toISOString() })
            });
            return newAnime;
        });
        this.update = (id, anime) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.anime.updateMany({
                where: {
                    id,
                    userId: this.userId
                },
                data: Object.assign(Object.assign({}, anime), { published: anime.published ? new Date(anime.published).toISOString() : undefined })
            });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            yield prisma.anime.deleteMany({
                where: {
                    id,
                    userId: this.userId
                }
            });
        });
        this.userId = userId;
    }
}
exports.default = AnimeRepository;
