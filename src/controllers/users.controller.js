import CreateUserService from "../services/users.service.js"


const CreateUser = async (req, res) => {
    try {
        const { nome, sobrenome, email, username, senha, avatar } = req.body

        if (!nome || !sobrenome || !email || !username || !senha || !avatar) {

            return res.status(400).send({ message: "Preencha todos os campos!" })
        }

        const user = await CreateUser.CreateUserService(req.body)

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
    catch (error) {
        return res.status(500).send({ message: error })
    }
}

export default {CreateUser}