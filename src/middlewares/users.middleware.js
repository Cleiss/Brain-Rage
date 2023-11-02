import mongoose from "mongoose";
import usersService from "../services/users.service.js"

const validId = (req, res, next) => {
    try {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).send({message: "Id de usuário inválido."})
        }

        next()
    }
    catch (err) {
        return res.status(500).send({message: err.message})
    }


}

/*validUser vai verificar se o usuário está válido no BD de acordo com o id*/
const validUser = async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await usersService.findUserById(id)

        if (!user) {

            return res.status(400).send({message: "Usuário não encontrado."})
        }

        req.id = id
        req.user = user

        next()
    }
    catch (err) {

        return res.status(500).send({message: err.message})
    }
}


export {validId, validUser}