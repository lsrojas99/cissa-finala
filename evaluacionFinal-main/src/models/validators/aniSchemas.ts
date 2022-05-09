import Joi from "joi";
import { CreateAniDTO, UpdateAniDTO } from "../dto/AniDTO";

export const createAniSchema: Joi.ObjectSchema<CreateAniDTO> = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string().required(),
  published: Joi.date().required(),
  duration: Joi.number().required(),
  year: Joi.number().required(),
  type: Joi.string().required(),
  episodes: Joi.number().required(),
  photo: Joi.string().uri()
})

export const updateAniSchema: Joi.ObjectSchema<UpdateAniDTO> = Joi.object().keys({
  name: Joi.string().required(),
  status: Joi.string().required(),
  published: Joi.date().required(),
  duration: Joi.number().required(),
  year: Joi.number().required(),
  type: Joi.string().required(),
  episodes: Joi.number().required(),
  photo: Joi.string().uri()
})