import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        sobrenome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        senha: {
            type: String,
            required: true,
            select: false
        },
        pix: {
            type: String,
            required: true
        },
        moedas: {
            type: Array
        },
        pontsem: {
            type: Array
        },
        pontmen: {
            type: Array
        }
    } /*required é a verificação dos dados no bd*/
)

UserSchema.pre("save", async function (next) {
    this.senha = await bcrypt.hash(this.senha, 10)

    /*função pre("save", função a ser executada) = antes de salvar algo, execute a função.
    neste caso, antes de salvar a senha, criptografe-a*/
    
    next()
})
/* hash() criptografa a senha; 10 = quant. de salt/rodadas*/

const Users_BrainRage = mongoose.model("Users_BrainRage", UserSchema)

export default Users_BrainRage