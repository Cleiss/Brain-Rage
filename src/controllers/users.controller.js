import UsersService from "../services/users.service.js"


const CreateUser = async (req, res) => {
    try {
        const { nome, sobrenome, email, username, senha, avatar } = req.body

        if (!nome || !sobrenome || !email || !username || !senha || !avatar) {

            return res.status(400).send({ message: "Preencha todos os campos!" })
        }

        const user = await UsersService.Create(req.body)

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar usuário!" })
        }

        return res.status(200).send({

            user: {
                id: user._id,
                nome,
                sobrenome,
                email,
                username,
                avatar
            },
            message: "Um novo usuário foi criado!"
        })


    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
}

const ReadUsers = async (req, res) => {
    try {
        const Users = await UsersService.ReadAll()

        if (!Users) {
            return res.status(400).send({message: "Usuários não encontrados."})
        }

        res.status(200).send(Users)
    }
    catch (err) {
        return res.status(500).send({message: err})
    }
}

export default {CreateUser, ReadUsers}