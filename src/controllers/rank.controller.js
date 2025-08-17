import usersService from "../services/users.service.js"
import rankdiarioService from "../services/rankdiario.service.js"

const rankingAtual = async (req, res) => {
    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const rank = await usersService.findRankAtual()

        const rankdiario = await rankdiarioService.findAllRanks()

        console.log(user.Score)

        if (!id || !user) {
            return res.status(401).send('Solicitação não permitida')
        }

        let hoje = new Date()
        const hojedia = hoje.getDate()
        const hojemes = hoje.getMonth()
        const hojeano = hoje.getFullYear()
        const pAtual = 0

        if (rankdiario[0].createdAt.getDate() != hojedia ||
            rankdiario[0].createdAt.getMonth() != hojemes ||
            rankdiario[0].createdAt.getFullYear() != hojeano) {
            rankdiarioService.createRank({ Rank: rank })

        }

        for (let i = 0; i < rank.length; i++) {

            if (hojedia != rank[i].Score.AtualizadoEm.getDate() ||
                hojemes != rank[i].Score.AtualizadoEm.getMonth() ||
                hojeano != rank[i].Score.AtualizadoEm.getFullYear()) {

                await usersService.updatepontAtual(rank[i].id, pAtual)
                await usersService.updatehora(rank[i].id, hoje)

            }
        }

        const rankAtt = await usersService.findRankAtual()

        // console.log(rankdiario[0].Rank[0].Score.pontAtual)
        // console.log(rankdiario[0].Rank[0].username)

        //console.log(rankdiario)

        return res.status(201).send(rankAtt)

    }
    catch (erro) {
        console.log(erro)
    }
}

const rankingTotal = async (req, res) => {
    try {

        const ranktotal = await usersService.findRankTotal()

        return res.status(201).send(ranktotal)
    }
    catch (erro) {
        console.log(erro)
    }
}

export default { rankingAtual, rankingTotal }