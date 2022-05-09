import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/jwt"
import { CreateUserDTO } from "../models/dto/UserDTO"
import UserRepository from "../models/repositories/UserRepository"
import { loginSchema, registerSchema } from "../models/validators/UserSchema"

export default class AuthController {
  public readonly login = async (req: Request, res: Response) => {
    const credentials = req.body

    try {
      await loginSchema.validateAsync(credentials)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const repository = new UserRepository()

    try {
      const userFromDb = await repository.findByEmail(credentials.email)

      if (!userFromDb || !bcrypt.compareSync(credentials.password, userFromDb.password)) {
        res.status(401).json({ message: 'Invalid credencials' })
        return
      }
  
      const token = generateToken(userFromDb)
  
      res.json({ token })
    }catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }

  public readonly register = async (req: Request, res: Response) => {
    const user = req.body as CreateUserDTO

    try {
      await registerSchema.validateAsync(user)
    }catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const heashedPassword = bcrypt.hashSync(user.password, 10)
    const repository = new UserRepository

    try {
      const newUser = await repository.create({ ...user, password: heashedPassword })
      res.status(201).json(newUser)
    }catch (error) {
      if (error.code == 'P2002') {
        res.status(409).json({ message: 'User already exists' })
        return
      }
      console.log(error)
      console.log('Error code', error.code)
      res.status(500).json({ message: 'Someting went wrong' })
    }
  }
}