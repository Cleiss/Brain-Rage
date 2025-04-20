import usersService from "../services/users.service.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const authMidd = (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401) //verifica se authorization contém um valor
        }

        const authHeader = authorization.split(" ")

        if (authHeader.length !== 2) {
            return res.status(401) //verifica se o array authHeader possui 2 elementos
        }

        const [schema, token] = authHeader //nomeia os elementos do array authHeader

        if (schema !== "Bearer") {
            return res.status(401) //verifica se o valor do elemento schema é "Bearer"
        }

        jwt.verify(token, process.env.SECRET_JWT, async (erro, decoded) => { //verifica o token e decodifica
            if (erro) {
                return res.status(401).send({ message: "Solicitação não permitida." })
            }

            const user = await usersService.findUserById(decoded.id) //busca o token decodificado/id no banco de dados

            if (!user || !user.id) {
                return res.status(401).send({ message: 'Solicitação não permitida.' }) //verifica se há valor em "user" ou "user.id"
            }

            req.userId = user.id
            //console.log(user.id)
            //console.log(req.params.id)

            /*if (req.params.id != user.id) //verifica se o "id" enviado e o "id" de quem está logado são os mesmos
                return res.status(401).send({ message: 'Solicitação não permitida.' })*/

            next()
        })

    }
    catch (err) {

        return res.status(500).send({ message: 'erro 500 authmid' })
    }

}

export default authMidd