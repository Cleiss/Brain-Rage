import usersService from "../services/users.service.js"

const confirmgame = async (req, res) => {

    try {

        const id = req.userId
        //console.log(req.id)
        //console.log(id)

        const user = await usersService.confirmById(id)
        //console.log(user)

        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não autorizada.' })
        }

        const compCor = 10
        const venceu = [0]
        const segjogo = [1]
        const perdeu = [2]
        const tempo = new Date()
        const pontProv = user.Score.pontProv
        const pontTotal = user.Score.pontTotal
        const pontAtual = user.Score.pontAtual

        if (user.seqServ.length === user.SeqPlay.length &&
            user.seqServ.every((val, index) => val === user.SeqPlay[index])) {
            if (user.seqServ.length === compCor) {

                await usersService.updatehora(id, tempo)

                const seqServ = []
                await usersService.updateseqServ(id, seqServ)

                const SeqPlay = []
                await usersService.updateseqPlay(id, SeqPlay)

                const ptotal = pontProv + pontTotal + 1
                await usersService.updatepontTotal(id, ptotal)

                const patual = pontProv + 1
                await usersService.updatepontAtual(id, patual)

                const prov = 0
                await usersService.updatepontProv(id, prov)

                //console.log(ptotal)

                return res.status(201).send(venceu)
            }
            else {

                const prov = pontProv + 1
                await usersService.updatepontProv(id, prov)

                const patual = pontProv + 1
                if (patual >= 5 && patual >= pontAtual && patual <= 25) {
                    await usersService.updatepontAtual(id, patual)
                }
                return res.status(201).send(segjogo)
            }
        }
        else {

            const seqServ = []
            await usersService.updateseqServ(id, seqServ)

            const SeqPlay = []
            await usersService.updateseqPlay(id, SeqPlay)

            const ptotal = pontAtual + pontTotal
            if (ptotal > pontTotal && pontProv >= 5) {
                await usersService.updatepontTotal(id, ptotal)
                await usersService.updatehora(id, tempo)
            }

            const prov = 0
            await usersService.updatepontProv(id, prov)

            const rank = await usersService.findRank()

            console.log(rank[0].Score.pontAtual)
            console.log(rank[0].username)
            console.log(rank[0].Score.AtualizadoEm)


            return res.status(201).send(perdeu)
        }
    }
    catch (erro) {
        console.log(erro)
    }

}

export default { confirmgame }