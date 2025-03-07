
import { FastifyInstance } from "fastify"
import { UserController } from "../controllers/UserController"
import { Autenticated } from "../middleware/AutenticatedGaranted"
import { VerifyUserAuthorization } from "../middleware/VerifyUserAuthorization"

const userController = new UserController()
export function userRoutes(userRoutes: FastifyInstance){

    userRoutes.get("/user", {preHandler: [Autenticated, VerifyUserAuthorization(["admin"])]}, userController.index)
    userRoutes.post("/user",{preHandler: [Autenticated,VerifyUserAuthorization(["member","admin"]) ]}, userController.create)
    userRoutes.put("/user/:id", {preHandler: [Autenticated, VerifyUserAuthorization(["admin"])]},userController.update)
    
}