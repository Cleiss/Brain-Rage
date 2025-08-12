import usersService from "../services/users.service.js"

const rankingAtual = async (req, res) => {
    try {

        const rank = await usersService.findRankAtual()

        console.log(rank)

        return res.status(201).send(rank)
    }
    catch(erro) {
        console.log(erro)
    }
}

const rankingTotal = async (req, res) => {
    try {

        const ranktotal = await usersService.findRankTotal()

        return res.status(201).send(ranktotal)
    }
    catch(erro) {
        console.log(erro)
    }
}

export default {rankingAtual, rankingTotal}