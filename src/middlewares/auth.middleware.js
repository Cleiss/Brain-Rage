import usersService from "../services/users.service.js"
import mongoose from "mongoose";
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export const authMidd = (req, res, next) => {
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
            //console.log(id)
            //console.log(req.params.id)

            /*if (req.params.id != user.id) //verifica se o "id" enviado e o "id" de quem está logado são os mesmos
                return res.status(401).send({ message: 'Solicitação não permitida.' })*/

            next()
        })

    }
    catch (err) {

        return res.status(500).send({ message: err })
    }


}

/*validId vai verificar se o id é um id válido do BD*/
export const validId = (req, res, next) => {
    try {
        const id = req.userId
        //console.log(id)

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).send({ message: "Id de usuário inválido." })
        }

        next()
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

/*validUser vai verificar se o usuário está válido no BD de acordo com o id*/
export const validUser = async (req, res, next) => {

    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        if (!user) {

            return res.status(400).send({ message: "Usuário não encontrado." })
        }

        //req.id = id
        //req.user = user
        //console.log(id)
        //console.log(user)

        next()
    }
    catch (err) {

        return res.status(500).send({ message: err.message })
    }
}