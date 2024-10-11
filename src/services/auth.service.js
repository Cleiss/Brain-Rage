import Users_BrainRage from "../models/users.js";
import jwt from "jsonwebtoken"

const loginService = (email) => 
    Users_BrainRage.findOne({email: email}).select("+senha")


const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})

/* const generateToken = () => jwt.sign({payload}, "hash MD5", options) */
/* https://www.md5hashgenerator.com/ */

/* o token serve para guardar a sessão do usuário e, principalmente, */
/* para o client saber qual usuário está na sessão/logado. */
/* será gerado quando, no controller de autenticação, o usuário fizer login. */

/* payload: dado do usuário que se deseja criptografar */
/* secretOrPrivateKey: qualquer parâmetro. neste caso servirá pra decodificar o json web token (criptografia MD5) */
/* options: geralmente alguma configuração na função, neste caso está usando tempo de expiração da sessão em segundos */

export default {loginService, generateToken}