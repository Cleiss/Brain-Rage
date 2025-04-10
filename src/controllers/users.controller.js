import usersService from "../services/users.service.js"


const createUser = async (req, res) => {
    try {
        const { nome, sobrenome, email, username, senha} = req.body

        if (!nome || !sobrenome || !email || !username || !senha) {

            return res.status(400).send({ message: "Preencha todos os campos!" })
        }

        const user = await usersService.createUser(req.body)

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar usuário!" })
        }

        return res.status(201).send({

            user: {
                id: user._id,
                nome,
                sobrenome,
                email,
                username
            },
            message: "Um novo usuário foi criado!"
        })


    }
    catch (err) {
        return res.status(500).send(err)
    }
}

const findAllUsers = async (req, res) => {
    try {
        const Users = await usersService.findAllUsers()

        if (!Users) {
            return res.status(400).send({ message: "Usuários não encontrados." })
        }

        res.status(200).send(Users)
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const findUserById = async (req, res) => {
    try {

        const user = req.user

        console.log(user)

        res.status(200).send({
            user
        })

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { nome, sobrenome, email, username, senha} = req.body

        if (!nome && !sobrenome && !email && !username && !senha) {

            res.status(400).send({message: "Preencha pelo menos um campo."})
        }

        const id = req.id
        const user = req.user

        await usersService.updateUser(
            id,
            nome, 
            sobrenome, 
            email, 
            username, 
            senha
        )

        return res.status(201).send({message: "Dados de usuário atualizados."})
    }
    catch (err) {
        return res.status(500).send({message: err.message})
    }
}

export default { createUser, findAllUsers, findUserById, updateUser }