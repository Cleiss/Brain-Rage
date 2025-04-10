import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import usersService from "../services/users.service.js"
import dotenv from "dotenv"

dotenv.config()

/*validId vai verificar se o id é um id válido do BD*/
const validId = (req, res, next) => {
    try {
        const id = req.params.id

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
const validUser = async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await usersService.findUserById(id)

        if (!user) {

            return res.status(400).send({ message: "Usuário não encontrado." })
        }

        req.id = id
        req.user = user

        next()
    }
    catch (err) {

        return res.status(500).send({ message: err.message })
    }
}

const authMidd = (req, res, next) => {
    try {
        const { authorization } = req.headers
        const {id} = req.params

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
                return res.status(401).send({ message: "Token inválido 1." })
            } 

            const user = await usersService.findUserById(decoded.id) //busca o token decodificado/id no banco de dados
        
            if (!user || !user.id) {
                return res.status(401).send({ message: 'Token inválido 2.' }) //verifica se há valor em "user" ou "user.id"
            }

            //console.log(req.id)
            //console.log(user.id)

            if (req.id != user.id) 
            throw new Error ('Atualização não permitida.')
        
        })

        next()

    }
    catch (err) {

        return res.status(500).send({ message: err.message })
    }


}


export default { validId, validUser, authMidd }