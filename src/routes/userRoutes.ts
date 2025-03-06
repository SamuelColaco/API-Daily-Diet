
import { FastifyInstance } from "fastify"
import { UserController } from "../controllers/UserController"
import { Autenticated } from "../middleware/AutenticatedGaranted"

const userController = new UserController()
export function userRoutes(userRoutes: FastifyInstance){

    userRoutes.get("/user", {preHandler: [Autenticated]}, userController.index)
    userRoutes.post("/user", userController.create)
    userRoutes.put("/user/:id", userController.update)
    
}