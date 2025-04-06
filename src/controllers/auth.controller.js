import bcrypt from "bcrypt"
import authService from "../services/auth.service.js"

const login = async (req, res) => {
    try {
        const {email, senha} = req.body

        const user = await authService.loginService(email)

        if (!user) {
            return res.status(404).send({message: "Usuário ou senha inválidos."})

        }

        const validSenha = bcrypt.compareSync(senha, user.senha)

        if (!validSenha) {
            return res.status(404).send({message: "Usuário ou senha inválidos."})

        }

        const token = authService.generateToken(user.id)

        res.status(201).send({token})
    }
    catch (err) {
        return res.status(500).send({message: err.message})
    }

}


export default login