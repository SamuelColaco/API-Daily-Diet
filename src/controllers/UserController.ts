
import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { hash } from "bcrypt"
import { z } from "zod"

interface RequestBodyUpdate{
    name: string
    email: string
    password?: string
}

export class UserController{
    async index(req: FastifyRequest, res: FastifyReply){
        const user = await prisma.user.findMany()

        res.status(200).send(user.length > 0 ? user : "Não tem usuários")
    }

    async create(req: FastifyRequest, res: FastifyReply){
        
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            role: z.enum(["member", "admin"]).optional()
        })

        const { name, email, password, role } = bodySchema.parse(req.body)

        const userExist = await prisma.user.findFirst({ where: { email }})

        if(userExist){
            throw new AppError("Usuário já existe")
        }

        const passwordHash =  await hash(password, 8)

        await prisma.user.create({ data: { name, email, password_hash: passwordHash, role}})

        res.status(201).send()

    }

    async update(req: FastifyRequest, res: FastifyReply){

        const { password, ...all } = req.body as RequestBodyUpdate

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const userExist = await prisma.user.findFirst({ where: { id }})

        if(!userExist){
            throw new AppError("Usuário não existe")
        }

        const password_hash = await hash(String(password), 8)


        await prisma.user.update({ where: { id }, data:{ ...all, ...(password_hash ? { password_hash }: {}) }})

        res.status(200).send()

    }
}
