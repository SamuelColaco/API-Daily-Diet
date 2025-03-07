
import { FastifyRequest, FastifyReply } from "fastify"
import { AppError } from "../utils/AppError"

export function VerifyUserAuthorization(roles: string[]){

    return async (req: FastifyRequest, res: FastifyReply) => {
        if(!req.user?.role){
            throw new AppError("Você não esta autenticado")
        }

        if(!roles.includes(req.user.role)){
            throw new AppError("Você não tem autorização")
        }
    }
}