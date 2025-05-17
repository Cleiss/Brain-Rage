import usersService from "../services/users.service.js"
import bcrypt from "bcrypt"
import nodemailer from 'nodemailer'


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

        const { nome, sobrenome, email, username,
            senha, pix } = req.body

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

const updateSenha = async (req, res) => {
    try {

        const email = req.body

        if (!email) {
            return res.status(400)
        }
        const user = await usersService.findUserByEmail(email)

        const id = user._id

        function gerarSenha(tamanho) {
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
        res.send(user)

        const carteiro = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "memocor.play@gmail.com",
                pass: "jdywmbvzizllbfvt "
            },
        });

        // Wrap in an async IIFE so we can use await.
        (async () => {
            const info = await carteiro.sendMail({
                from: 'MemoCor <memocor.play@gmail.com>',
                to: `${user.email}`,
                subject: 'Solicitação de Nova Senha',
                html: `<html><body>

                        <h1>Sua nova senha ${novasenha} chegou!</h1>

                        </body></html>`,
                text: 'testando envio de email pelo node'
            });

            console.log("Message sent:", info.messageId);
        })();
    }
    catch (erro) {
        console.log(erro)
    }
}


export default { createUser, findAllUsers, findUserById, updateUser, updateSenha }