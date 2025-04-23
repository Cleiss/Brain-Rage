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

        const compCor = 25
        const venceu = [0]
        const segjogo = [1]
        const perdeu = [2]
        const pont_prov = user.pont_prov
        const pont_total = user.pont_total
        const pont_atual = user.pont_atual

        if (user.seqServ.length === user.SeqPlay.length &&
            user.seqServ.every((val, index) => val === user.SeqPlay[index])) {
            if (user.seqServ.length === compCor) {

                const seqServ = []
                await usersService.updateseqServ(id, seqServ)

                const SeqPlay = []
                await usersService.updateseqPlay(id, SeqPlay)

                const ptotal = pont_prov[0] + pont_total[0] + 1
                await usersService.updatepont_total(id, ptotal)

                const patual = pont_prov[0] + 1
                await usersService.updatepont_atual(id, patual)

                const prov = [0]
                await usersService.updatepont_atual(id, prov)

                //console.log(ptotal)

                return res.status(201).send(venceu)
            }
            else {

                const prov = pont_prov[0] + 1
                //console.log(patual)
                await usersService.updatepont_prov(id, prov)

                const patual = pont_prov[0] + 1
                if (patual >= 10 && patual >= pont_atual && patual <= 25) {
                    await usersService.updatepont_atual(id, patual)
                }
                return res.status(201).send(segjogo)
            }
        }
        else {

            const seqServ = []
            await usersService.updateseqServ(id, seqServ)

            const SeqPlay = []
            await usersService.updateseqPlay(id, SeqPlay)

            const ptotal = pont_atual[0] + pont_total[0]
            if (ptotal > pont_total && pont_prov >= 10) {
                await usersService.updatepont_total(id, ptotal)
            }

            const prov = [0]
            await usersService.updatepont_prov(id, prov)

            return res.status(201).send(perdeu)
        }
    }
    catch (erro) {
        console.log('erro nada ok aqui!')
    }

}

export default { confirmgame }