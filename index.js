import express from "express"
import connectDB from "./src/database/database.js"
import dotenv from "dotenv"
import userRouter from "./src/routes/users.route.js"
import authRouter from "./src/routes/auth.route.js"
import swaggerRouter from "./src/routes/swagger.route.cjs"
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000


dotenv.config() /*dotenv está aqui pq a função que executa o banco de dados está sendo executada aqui no index.js*/
app.use(cors()) /* módulo que habilita CORS para vários endpoints. evita o problema de Access-Control-Allow-Origin. */
connectDB()

app.use(express.json())
app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/doc", swaggerRouter)

app.listen(port, () => {
    console.log("Servidor aberto, aguardando resposta do Banco de Dados...")
})