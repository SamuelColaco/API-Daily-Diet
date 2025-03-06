
import { FastifyInstance } from "fastify"
import { SessionController } from "../controllers/SessionController"

const sessionController = new SessionController()

export function sessionRoutes(sessionRoutes: FastifyInstance){

    sessionRoutes.post("/session", sessionController.create)
    
}