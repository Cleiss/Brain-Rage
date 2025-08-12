import usersService from "../services/users.service.js"

const resetSeq = async (req, res) => {

    try {

        const id = req.userId

        const user = await usersService.confirmById(id)

        if (!id || !user) {
            return res.status(401).send('Solicitação não permitida')
        }

        const seqServ = []
        await usersService.updateseqServ(id, seqServ)

        const SeqPlay = []
        await usersService.updateseqPlay(id, SeqPlay)

        const prov = 0
        await usersService.updatepontProv(id, prov)
    }
    catch (erro) {
        console.log(erro)
    }
}


export default { resetSeq }