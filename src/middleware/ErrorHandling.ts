
import { FastifyRequest, FastifyReply } from "fastify"
import { AppError } from "../utils/AppError"
import { ZodError } from "zod"

export function ErrorHandling(err: any, req: FastifyRequest, res: FastifyReply){

    if(err instanceof AppError){
        return res.status(err.statusCode).send({ message: err.message})
    }

    if(err instanceof ZodError){
        return res.status(400).send({ message: err.format()})
    }
}