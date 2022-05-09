import { Router } from "express";
import AniController from "../controllers/AniController";

const aniRoutes = Router()
const controller = new AniController()

aniRoutes.get('/', controller.getAll)
aniRoutes.get('/:id', controller.getById)
aniRoutes.get('/', controller.create)
aniRoutes.get('/:id', controller.update)
aniRoutes.get('/:id', controller.delete)

export default aniRoutes