import usersService from "../services/users.service.js"

const resetSeq = async (req, res) => {

    try {

        const id = req.userId

        const seqServ = []
        await usersService.updateseqServ(id, seqServ)
    }
    catch (erro) {
        console.log(erro)
    }
}

export default {resetSeq}