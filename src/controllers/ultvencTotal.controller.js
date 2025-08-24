import ranktotalService from "../services/ranktotal.service.js"
import usersService from "../services/users.service.js"

const ultVencTotal = async (req, res) => {
    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const rankT = await ranktotalService.findAllRanksTotal()

        const userVencT = rankT[0].Rank[0]

        return res.status(201).send(userVencT)

    }
    catch (erro) {
        console.log(erro)
    }
}

    export default {ultVencTotal}