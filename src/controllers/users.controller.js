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
        now.setHours(now.getHours() + 1)

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

        const link = process.env.BASEURL

        //(async () => {
            const info = /*await*/ carteiro.sendMail({
                from: 'MemoCor <memocor.play@gmail.com>',
                to: `${user.email}`,
                subject: 'Solicitação de Nova Senha',
                html: `<body>
                    <h1>🔐 Sistema de recuperação de senha 🔐</h1>
                    <p>Prezado(a) bom dia, boa tarde, boa noite ! Esse e-mail é automatico então por favor, não responda.</p>
                    <P>Esqueceu a senha ? Não se preocupe, utilize este link: 👉 ${link}?token=${token}&id=${id} 👈</P>

                    <h2>Dicas</h2>
                    <p> - O token tem um prazo de duas horas para ser ultilizado. Sendo ultrapassado, será necessário fazer uma nova solicitação 🕑</p>
                    <p> - Sua senha é pessoal e não pode ser compartilhada 🤫</p>
                    <p> - Para alterar a senha insira o token recebido no campo código no formulário 📜</p>

                    <b><h4>Atenciosamente</h4>
                        <h4>Equipe de suporte 💻</h4></b>
                </body>`
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


export default { createUser, findAllUsers, findUserById, updateUser, solicitaLink }