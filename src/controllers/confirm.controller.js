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
        const ok = [0]
        const segjogo = [1]
        const perdeu = [2]

       if (user.seqServ.length === user.SeqPlay.length &&
            user.seqServ.every((val, index) => val === user.SeqPlay[index])) {
            if (user.seqServ.length === compCor) {

                const seqServ = []
                await usersService.updateseqServ(id, seqServ)
                return res.status(201).send(ok)
            }
            else {
                return res.status(201).send(segjogo)
            }
        }
        else {
            const seqServ = []
            await usersService.updateseqServ(id, seqServ)
            return res.status(201).send(perdeu)
        }
    }
    catch (erro) {
        console.log('erro nada ok aqui!')
    }

}

export default {confirmgame}