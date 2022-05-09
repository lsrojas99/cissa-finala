import{ Request, Response } from "express"
import { AniDTO, CreateAniDTO, UpdateAniDTO } from "../models/dto/AniDTO"
import AniRepository from "../models/repositories/AniRepository"
import { UserTokenPayload } from "../models/Types"
import { createAniSchema, updateAniSchema } from "../models/validators/aniSchemas"

export default class AnimeController {
  public readonly getAll = async (req: Request, res: Response) => {
    const user = req.user as UserTokenPayload
    const repository = new AniRepository(user.sub)

    try {
      const anime: AniDTO[] = await repository.findAll()
      res.json(anime)
    } catch (error) {
      console.log(error)
      res.status(500).json({ message:'Someting went wrong' })
    }
  }

  public readonly getById = async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.user as UserTokenPayload
    const repository = new AniRepository(user.sub)
    const anime = await repository.findById(parseInt(id))

    if (!anime) {
      res.status(404).json({ message: 'Anime not found' })
      return
    }
    res.json(anime)
  }

  public readonly create = async (req: Request, res: Response) => {
    const anime = req.body as CreateAniDTO

    try {
      await createAniSchema.validateAsync(anime)
    } catch (error) {
      res.status(400).json ({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new AniRepository(user.sub)

    try {
      const newAnime = await repository.create(anime)
      res.json(newAnime)
    } catch (error) {
      if (error.code == 'P2002') {
        res.status(409).json({ message: 'Anime already exists' })
        return
      }
      console.log(error)
      console.log('error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }

  public readonly update = async (req: Request, res: Response) => {
    const { id } = req.params
    const anime = req.body as UpdateAniDTO

    try {
      await updateAniSchema.validateAsync(anime)
    } catch (error) {
      res.status(400).json({ message: error.message })
      return
    }

    const user = req.user as UserTokenPayload
    const repository = new AniRepository(user.sub)

    try {
      await repository.update(parseInt(id), anime)
    } catch (error) {
      if (error.code == 'P2002') {
        res.status(409).json({ message: 'Anime already exists' })
        return
      }
      console.log(error)
      console.log('error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }

  public readonly delete = async (req: Request, res: Response) => {
    const { id } = req.params

    const user = req.user as UserTokenPayload
    const repository = new AniRepository(user.sub)

    try {
      await repository.delete(parseInt(id))
      res.sendStatus(204)
    } catch (error) {
      console.log(error)
      console.log('Error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }
}