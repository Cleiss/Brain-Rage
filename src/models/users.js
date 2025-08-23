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
            required: true,
            unique: true
        },
        moedas: {
            type: Number
        },
        Score: {
            ScoreDiario: {
                pontAtual: {
                    type: Number
                },
                pontProv: {
                    type: Number
                },
                DiariaAcum: {
                    type: Array
                },
                DiarioAtualizadoEm: { type: Date, default: Date.now }
            },
            ScoreTotal: {
                pontTotal: {
                    type: Number
                },
                TotalAtualizadoEm: { type: Date, default: Date.now }
            }
        },
        seqServ: {
            type: Array
        },
        SeqPlay: {
            type: Array
        },
        senhaTokenReset: {
            type: String,
        },
        senhaTokenExpire: {
            type: Date,
        }
    },
    { timestamps: true }
)


UserSchema.pre("save", async function (next) {
    this.senha = await bcrypt.hash(this.senha, 10)

    /*função pre("save", função a ser executada) = antes de salvar algo, execute a função.
    neste caso, antes de salvar a senha, criptografe-a*/
    /* hash() criptografa a senha; 10 = quant. de salt/rodadas*/

    next()
})

const UserMemo = mongoose.model("UserMemo", UserSchema)


export default UserMemo