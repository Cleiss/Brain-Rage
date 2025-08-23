import usersService from "../services/users.service.js"

const confirmgame = async (req, res) => {

    try {

        const id = req.userId

        const user = await usersService.confirmById(id)

        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não autorizada.' })
        }

        const compCor = 7
        const venceu = [0]
        const segjogo = [1]
        const perdeu = [2]
        const tempo = new Date()
        const pontProv = user.Score.ScoreDiario.pontProv
        const pontAtual = user.Score.ScoreDiario.pontAtual
        const DiariaAcum = user.Score.ScoreDiario.DiariaAcum

        if (user.seqServ.length === user.SeqPlay.length &&
            user.seqServ.every((val, index) => val === user.SeqPlay[index])) {
            if (user.seqServ.length === compCor) {

                await usersService.updatetempodiario(id, tempo)

                const seqServ = []
                await usersService.updateseqServ(id, seqServ)

                const SeqPlay = []
                await usersService.updateseqPlay(id, SeqPlay)

                const patual = pontProv + 1
                await usersService.updatepontAtual(id, patual)

                DiariaAcum.push(pontProv + 1)
                await usersService.updateDiariaAcum(id, DiariaAcum)

                const prov = 0
                await usersService.updatepontProv(id, prov)

                return res.status(201).send(venceu)
            }
            else {

                const prov = pontProv + 1
                await usersService.updatepontProv(id, prov)

                if (prov <= 7) {
                    return res.status(201).send(segjogo)
                }

            }
        }
        else {

            const seqServ = []
            await usersService.updateseqServ(id, seqServ)

            const SeqPlay = []
            await usersService.updateseqPlay(id, SeqPlay)

            DiariaAcum.push(pontProv)

            if (pontProv >= 3 && pontProv >= pontAtual) {
                await usersService.updatepontAtual(id, pontProv)
                await usersService.updatetempodiario(id, tempo)
                await usersService.updateDiariaAcum(id, DiariaAcum)

            }

            const prov = 0
            await usersService.updatepontProv(id, prov)

            return res.status(201).send(perdeu)

        }
    }
    catch (erro) {
        console.log(erro)
    }

}

export default { confirmgame }