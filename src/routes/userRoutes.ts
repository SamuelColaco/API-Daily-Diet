
import { FastifyInstance } from "fastify"
import { UserController } from "../controllers/UserController"

const userController = new UserController()
export function userRoutes(userRoutes: FastifyInstance){

    userRoutes.get("/user", userController.index)
    userRoutes.post("/user", userController.create)
    userRoutes.put("/user/:id", userController.update)
    
}