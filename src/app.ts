
import fastify from "fastify"
import { userRoutes } from "./routes/userRoutes"
import { ErrorHandling } from "./middleware/ErrorHandling"
import { sessionRoutes } from "./routes/sessionRoutes"

const app = fastify()

app.register(userRoutes)
app.register(sessionRoutes)


app.setErrorHandler(ErrorHandling)
    

export { app }