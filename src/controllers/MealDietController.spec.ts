
import request from "supertest"
import { app } from "../app"

describe("MealDietController", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    
    it("List All Meals", async () => {

        const req = await request(app.server).post("/session").send({
            email: "diegofernad@gmail.com",
            password: "1234567"
        })
    
        const token = req.body.token
    
        const response = await request(app.server).get("/meal").set("Authorization", `Bearer ${token}`)
    
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })


    it("Create Meal", async () => {
        
        const req = await request(app.server).post("/session").send({
            email: "diegofernad@gmail.com",
            password: "1234567"
        })
    
        const token = req.body.token
    
        const response = await request(app.server).post("/meal").set("Authorization", `Bearer ${token}`).send({
            "name": "Bolo de cacau",
            "description": "Bolo com cacau por cima",
            "date": "2025-07-08",
            "hour": "15:40",
            "InDiet": false
        })
    
        expect(response.status).toBe(201)
        expect(Array.isArray(response.body)).toBe(false)
    })


    it("List all Meal and atributes from a user", async () => {
        const req = await request(app.server).post("/session").send({
            email: "diegofernad@gmail.com",
            password: "1234567"
        })
    
        const token = req.body.token
    
        const response = await request(app.server).get("/meal/20d1165e-0ea4-4709-bb4a-5e1bb55e09cf").set("Authorization", `Bearer ${token}`)
    
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(false)
    })

})