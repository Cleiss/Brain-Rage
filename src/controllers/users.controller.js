import usersService from "../services/users.service.js"
import crypto from 'crypto'
import bcrypt from "bcrypt"
import nodemailer from 'nodemailer'
import dotenv from "dotenv"


const createUser = async (req, res) => {
    try {
        const { nome, sobrenome, email, username, senha, pix, moedas } = req.body

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

        const username = req.body.username
        const senha = req.body.senha

        if (!username && !senha) {

            res.status(400).send({ message: "Preencha pelo menos um campo." })
        }

        const user = await usersService.findUserById(id)

        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não permitida.' })
        }

        if (username.length >= 3 && username.length <= 10) {
            await usersService.updateUserUsername(
                id,
                username
            )
        }

        console.log(username.length)

        if (senha.length >= 3) {
            await usersService.updateUserSenha(
                id,
                senha
            )
            user.senha = senha

            await user.save()
        }

        return res.status(201).send({ message: "Jogador atualizado." })
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

const solicitaLink = async (req, res) => {
    try {

        const email = req.body

        if (!email) {
            return res.status(400)
        }
        const user = await usersService.findUserByEmail(email)

        if (!user) {
            res.status(400).send({ message: "Usuário não encontrado." })
        }

        const id = user.id

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setMinutes(now.getMinutes() + 10)

        await usersService.updatesenhaTokenReset(id, token)
        await usersService.updatesenhaTokenExpire(id, now)

        res.status(201).send({ user })

        const carteiro = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
        });

        //const localport = "http://localhost:5173"

        const link = `${process.env.BASEURL}/resetasenha?token=${token}&id=${id}`
        //`${localport}/resetasenha?token=${token}&id=${id}`

        //(async () => {
        const info = /*await*/ carteiro.sendMail({
            from: 'MemoCor <memocor.play@gmail.com>',
            to: `${user.email}`,
            subject: 'Solicitação de Nova Senha',
            html: `<body>
                    <p>
                    Olá! Você está recebendo o link para trocar a senha.<br/>
                    O link expira em 10 minutos, seja rápido.                    
                    </p><br/>
                    <h5>${link}</h5>
                </body>`,
            text: `Olá! Você está recebendo o link para trocar a senha. Expira em 10 minutos, não demore. ${link}`
        });

        //console.log("Message sent:", info.messageId);
        //})() // async/await utilizado para certificar de que a msg foi enviada através do console.log() 

        /*function gerarSenha(tamanho) {
        let resultado = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&?!';

        for (let i = 0; i < tamanho; i++) {
            resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }

        return resultado;
    }

    const novasenha = gerarSenha(7)

    const senha = await bcrypt.hash(novasenha, 10)

    await usersService.updateSenha(id, senha)
    res.send(user)*/
    }
    catch (erro) {
        console.log(erro)
    }
}

const resetSenha = async (req, res) => {

    try {

        const token = req.params.token
        const id = req.params.id

        const user = await usersService.findUserById(id)

        const now = new Date()

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado." })
        }

        if (token !== user.senhaTokenReset) {

            return res.status(400).send({ message: "Link inválido." })
        }

        if (now > user.senhaTokenExpire) {

            return res.status(400).send({ message: "Link expirado." })
        }

        user.senha = req.body.senha

        user.senhaTokenReset = null

        await usersService.updateToken(id, user.senhaTokenReset)

        await user.save()

        const carteiro = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
        });

        //(async () => {
        const info = /*await*/ carteiro.sendMail({
            from: 'MemoCor <memocor.play@gmail.com>',
            to: `${user.email}`,
            subject: 'Alteração de Senha',
            html: `<body>
                    <p>
                    Olá! Você está recebendo este email devido a alteração da senha de sua conta.<br/>
                    Caso não tenha executado essa ação, solicite a troca da senha imediatamente.                    
                    </p><br/>
                </body>`,
            text: 'Olá! Você está recebendo este email devido a alteração da senha de sua conta. Caso não tenha executado essa ação, solicite a troca da senha imediatamente.'
        });

        return res.status(201).send({ message: "Senha alterada com sucesso." })

    }
    catch (erro) {
        console.log(erro)
    }

}


export default { createUser, findAllUsers, findUserById, updateUser, solicitaLink, resetSenha }