

import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../prisma"
import { string, z } from "zod"
import { AppError } from "../utils/AppError"

interface RequestBodyUpdate{
    name: string
    description?: string
    date: string
    hour: string
    InDiet: boolean
}

export class MealDietController{
    async index(req: FastifyRequest, res: FastifyReply){

        const meals = await prisma.dietMeal.findMany()

        res.status(200).send(meals.length > 0 ? meals : "Não tem refeições")
    }

    async create(req: FastifyRequest, res: FastifyReply){

        const bodySchema = z.object({
            name: z.string(),
            description: z.string().optional(),
            date: z.string().date(),
            hour: z.string(),
            InDiet: z.boolean()
        })

        const { name, description, date, hour, InDiet } = bodySchema.parse(req.body)

        if(!req.user){
            throw new AppError("Usuário não autenticado")
        }

        await prisma.dietMeal.create({ data: { name, description, date, hour, InDiet, userId: req.user?.id }})

        res.status(201).send()
    }

    async update(req: FastifyRequest, res: FastifyReply){

        const { ...all } =  req.body as RequestBodyUpdate

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramSchema.parse(req.params)

        const mealExist = await prisma.dietMeal.findFirst({ where: { id }})

        if(!mealExist){
            throw new AppError("Essa refeição não foi adicionada")
        }

        await prisma.dietMeal.update({ where: { id }, data: { ...all }})

        res.status(200).send()
    }
}