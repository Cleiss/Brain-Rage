import usersService from "../services/users.service.js"
import rankdiarioService from "../services/rankdiario.service.js"
import ranktotalService from "../services/ranktotal.service.js"

const rankingAtual = async (req, res) => {
    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const usersRank = await usersService.findAllUsers()

        const rank = await usersService.findRankDiario()

        const rankdiario = await rankdiarioService.findRankDiarioAnterior()

        if (!id || !user) {
            return res.status(401).send('Solicitação não permitida')
        }

        const hoje = new Date()
        const hojedia = hoje.getUTCDate()
        const hojemes = hoje.getUTCMonth()
        const hojeano = hoje.getUTCFullYear()
        const pAtual = 0
        const pAcum = []

        console.log(hoje.get)

        if (rankdiario[0].createdAt.getUTCDate() != hojedia ||
            rankdiario[0].createdAt.getUTCMonth() != hojemes ||
            rankdiario[0].createdAt.getUTCFullYear() != hojeano) {

            rankdiarioService.createRank({ Rank: rank })

        }

        for (let i = 0; i < usersRank.length; i++) {

            if (hojedia != usersRank[i].Score.ScoreDiario.DiarioAtualizadoEm.getUTCDate()) {

                await usersService.updatepontAtual(usersRank[i].id, pAtual)
                await usersService.updatetempodiario(usersRank[i].id, hoje)
                await usersService.updateDiariaAcum(usersRank[i].id, pAcum)

            }
        }

        const rankAtt = await usersService.findRankDiario()

        return res.status(201).send(rankAtt)

    }
    catch (erro) {
        console.log(erro)
    }
}

const rankingTotal = async (req, res) => {
    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const usersRank = await usersService.findAllUsers()

        const rank = await usersService.findRankTotal()

        const rankTotal = await ranktotalService.findAllRanksTotal()

        if (!id || !user) {
            return res.status(401).send('Solicitação não permitida')
        }

        const hoje = new Date()
        const hojedia = hoje.getUTCDate()
        const hojemes = hoje.getUTCMonth()
        const hojeano = hoje.getUTCFullYear()
        const pTotal = 0

        if (rankTotal[0].createdAt.getUTCDate() + 5 == hojedia &&
            rankTotal[0].createdAt.getUTCMonth() == hojemes &&
            rankTotal[0].createdAt.getUTCFullYear() == hojeano) {
            ranktotalService.createRankTotal({ Rank: rank })

            for (let i = 0; i < usersRank.length; i++) {

                await usersService.updatepontTotal(usersRank[i].id, pTotal)
                await usersService.updatetempototal(usersRank[i].id, hoje)

            }

        }

        const rankAtt = await usersService.findRankTotal()

        return res.status(201).send(rankAtt)
    }
    catch (erro) {
        console.log(erro)
    }
}

export default { rankingAtual, rankingTotal }