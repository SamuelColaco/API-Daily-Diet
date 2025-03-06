
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { compare } from "bcrypt"
import { authConfig } from "../config/env"
import { sign } from "jsonwebtoken"

export class SessionController{
    async create(req: FastifyRequest, res: FastifyReply){

        const BodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        const { email, password } = BodySchema.parse(req.body)

        const userExist = await prisma.user.findFirst({ where: { email }})

        if(!userExist){
            throw new AppError("Esse usuário não existe")
        }

        const passwordExist = compare(password, userExist.password_hash)

        if(!passwordExist){
            throw new AppError("Email e/ou senha errados")
        }

        const { secret, expiresIn } = authConfig.jwt
        
        const token = sign({role: userExist.role ?? "member" }, secret, {
            expiresIn,
            subject: userExist.id
        })

        res.status(200).send({ token: token})
    }
}