
import fastify from "fastify"
import { userRoutes } from "./routes/userRoutes"
import { ErrorHandling } from "./middleware/ErrorHandling"

const app = fastify()

app.register(userRoutes)


app.setErrorHandler(ErrorHandling)
    

export { app }