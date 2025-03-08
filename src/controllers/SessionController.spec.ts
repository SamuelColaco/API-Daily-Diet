
import  request from "supertest"
import { app } from "../app"

describe("SessionController", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("Create a session" , async () => {
        const response = await request(app.server).post("/session").send({
                email: "diegofernad@gmail.com",
                password: "1234567"
            })
            
            expect(response.status).toBe(200)
    })
})