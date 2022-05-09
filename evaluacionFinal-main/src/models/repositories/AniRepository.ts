import { PrismaClient } from '@prisma/client'
import { AniDTO, CreateAniDTO, UpdateAniDTO } from '../dto/AniDTO'

const prisma = new PrismaClient()

export default class AniRepository {
  private userId: number

  constructor(userId: number) {
    this.userId = userId
  }

  public readonly findAll = async(): Promise<AniDTO[]> => {
    const anime = await prisma.anime.findMany({
      where: {
        userId: this.userId
      }
    })
    return anime
  }

  public readonly findById = async(id: number): Promise<AniDTO | undefined> => {
    const anime = await prisma.anime.findFirst({
      where: {
        id,
        userId: this.userId
      }
    })

    if (!anime) return
    return anime
  }

  public readonly create = async (anime: CreateAniDTO): Promise<AniDTO> => {
    const newAnime = await prisma.anime.create({
      data: {
        ...anime,
        userId: this.userId,
        published: new Date(anime.published).toISOString()
      }
    })

    return newAnime
  }

  public readonly update = async (id: number, anime: UpdateAniDTO): Promise<void> => {
    await prisma.anime.updateMany({
      where: {
        id,
        userId: this.userId
      },
      data: {
        ...anime,
        published: anime.published? new Date(anime.published).toISOString(): undefined
      }
    })
  }

  public readonly delete = async (id: number) => {
    await prisma.anime.deleteMany({
      where: {
        id,
        userId: this.userId
      }
    })
  }
}