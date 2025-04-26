import pontosService from "../services/pontos.service.js"

const createPontos = async (req, res) => {
    try {
        const {pont_prov, pont_atual, pont_total, createdAt, updateAt} = req.body


        const pontos = await pontosService.createPontos({pont_prov, pont_atual, 
            pont_total, createdAt, updateAt, user: user.reqId})

        if (!pontos) {
            return res.status(400).send({ message: "Erro ao criar Pontos!" })
        }

        return res.status(201).send({
            message: "Um novo usuário foi criado!"
        })


    }
    catch (err) {
        return res.status(500).send(err.keyValue)
    }
}

const findAllPontos = async (req, res) => {
    try {
        const pontos = await pontosService.findAllPontos()

        if (!pontos) {
            return res.status(400).send({ message: "Pontos não encontrados." })
        }

        res.status(200).send(pontos)
    }
    catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

export default {findAllPontos, createPontos}