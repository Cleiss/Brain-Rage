import usersService from "../services/users.service.js"

const criarcor = async (req, res) => {

    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const semfichas = [0]

        // if (user.moedas < 1) {
        //     return res.status(401).send(semfichas)
        // }

        const cor = Math.floor(Math.random() * 5)
        const seqServ = user.seqServ
        seqServ.push(cor)

        
        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não autorizada.' })
        }

        await usersService.updateseqServ(id, seqServ)
        return res.status(201).send(user.seqServ)
    }
    catch (erro) {
        console.log(erro)
    }

}

const Fichas = async (req, res) => {

    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const semfichas = [0]

        // if (user.moedas < 1) {
        //     return res.status(401).send(semfichas)
        // }

        const fichas = user.moedas
        const moedas = fichas - 1
        await usersService.updateCoin(id, moedas)
    }
    catch(erro) {
        console.log(erro)
    }
}

export default { criarcor, Fichas }