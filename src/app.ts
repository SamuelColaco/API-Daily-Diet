
import fastify from "fastify"
import { userRoutes } from "./routes/userRoutes"
import { ErrorHandling } from "./middleware/ErrorHandling"
import { sessionRoutes } from "./routes/sessionRoutes"
import { mealRoutes } from "./routes/mealRoutes"

const app = fastify()

app.register(userRoutes)
app.register(sessionRoutes)
app.register(mealRoutes)


app.setErrorHandler(ErrorHandling)
    

export { app }