
import { FastifyInstance } from "fastify"
import { Autenticated } from "../middleware/AutenticatedGaranted"
import { VerifyUserAuthorization } from "../middleware/VerifyUserAuthorization"
import { MealDietController } from "../controllers/MealDietController"


const mealDietController = new MealDietController()

export function mealRoutes(mealRoutes: FastifyInstance){

    mealRoutes.get("/meal", { preHandler : [ Autenticated, VerifyUserAuthorization(["admin"])]},mealDietController.index)
    mealRoutes.post("/meal", { preHandler: [Autenticated, VerifyUserAuthorization(["member", "admin"])]}, mealDietController.create)
    mealRoutes.put("/meal/:id", { preHandler : [Autenticated, VerifyUserAuthorization(["admin"])]}, mealDietController.update)
}
