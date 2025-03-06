
import { FastifyRequest, FastifyReply } from "fastify"
import { AppError } from "../utils/AppError"
import { verify } from "jsonwebtoken"
import { authConfig } from "../config/env"

export  function Autenticated(req: FastifyRequest, res: FastifyReply){

    interface TokenPayload{
        role: string,
        sub: string
    }

    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError("Você não está autenticado")
    }

    const authHeaderToken = authHeader.slice(7)

    const { sub: userId, role } = verify(authHeaderToken, authConfig.jwt.secret) as TokenPayload

    req.user = {
        id: userId,
        role
    }
}
