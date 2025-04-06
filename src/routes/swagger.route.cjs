const { Router } = require ("express");
const swaggerUi =  require ("swagger-ui-express")
const swaggerDocument = require ("../swagger.json")


const swaggerRouter = Router()

swaggerRouter.use("/", swaggerUi.serve)
swaggerRouter.get("/", swaggerUi.setup(swaggerDocument))

module.exports = swaggerRouter