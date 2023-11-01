import mongoose from "mongoose"

const connectDB = () => {
    console.log("Aguardando conexão com o Banco de Dados...")

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, /*ler sobre*/
        useUnifiedTopology: true /*ler sobre*/
    })

        .then(() => {
            console.log("Banco de Dados conectado.")
        })
        .catch((erro) => {
            console.log("Erro ao se conectar com o Banco de Dados.")
        })
}


export default connectDB