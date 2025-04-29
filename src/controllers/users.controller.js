import usersService from "../services/users.service.js"


const createUser = async (req, res) => {
    try {
        const { nome, sobrenome, email, username, senha, pix, moedas} = req.body

        if (!nome || !sobrenome || !email || !username || !senha || !pix) {

            return res.status(400).send({ message: "Preencha todos os campos!" })
        }

        const user = await usersService.createUser(req.body)

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar usuário!" })
        }

        return res.status(201).send({
            message: "Usuário foi criado!"
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

        const id = req.userId

        const user = await usersService.findUserById(id)

        res.send(user)

    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const updateUser = async (req, res) => {

    try {

        const id = req.userId

        const { nome, sobrenome, email, username,
            senha, pix} = req.body

        if (!nome && !sobrenome && !email && !username
            && !senha && !pix) {

            res.status(400).send({ message: "Preencha pelo menos um campo." })
        }

        const user = await usersService.findUserById(id)

        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não permitida.' })
        }

        await usersService.updateUser(
            id,
            nome,
            sobrenome,
            email,
            username,
            senha,
            pix
        )

        return res.status(201).send({ message: "Dados de usuário atualizados." })
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}


export default { createUser, findAllUsers, findUserById, updateUser }