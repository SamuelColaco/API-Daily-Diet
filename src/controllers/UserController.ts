
import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../prisma"
import { z } from "zod"
import { AppError } from "../utils/AppError"
import { hash } from "bcrypt"

export class UserController{
    async index(req: FastifyRequest, res: FastifyReply){
        const user = await prisma.user.findMany()

        res.status(200).send(user.length > 0 ? user : "Não tem usuários")
    }

    async create(req: FastifyRequest, res: FastifyReply){
        
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const userExist = await prisma.user.findFirst({ where: { email }})

        if(userExist){
            throw new AppError("Usuário já existe")
        }

        const passwordHash =  await hash(password, 8)

        await prisma.user.create({ data: { name, email, password_hash: passwordHash }})

        res.status(201).send()

    }
}