
import  request from "supertest"
import { app } from "../app"

describe("UserController", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("List all users", async () => {
         const req = await request(app.server).post("/session").send({
            email: "diegofernad@gmail.com",
            password: "1234567"
        })
    
        const token = req.body.token
    
        const response = await request(app.server).get("/user").set("Authorization", `Bearer ${token}`)
    
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true) 
    })

    it("Create user", async () => {
        const req = await request(app.server).post("/session").send({
                email: "diegofernad@gmail.com",
                password: "1234567"
            })
        
            const token = req.body.token
        
            const response = await request(app.server).post("/user").set("Authorization", `Bearer ${token}`).send({
                name:"Rodrigo",
                email: "rodgrio@gmail.com",
                password: "1234567"
            })
        
            expect(response.status).toBe(201)
            expect(Array.isArray(response.body)).toBe(false)
    })


})