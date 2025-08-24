import rankdiarioService from "../services/rankdiario.service.js"
import usersService from "../services/users.service.js"


const ultVenc = async (req, res) => {
    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const rankD = await rankdiarioService.findRankDiarioAnterior()

        const userVenc = rankD[0].Rank[0]

        return res.status(201).send(userVenc)

    }
    catch (erro) {
        console.log(erro)
    }
}


export default {ultVenc}