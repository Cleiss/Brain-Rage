import usersService from "../services/users.service.js"

const playcor = async (req, res) => {

    try {

        const id = req.userId

        const user = await usersService.findUserById(id)

        const cor = req.body.data
        const seqPlay = cor

        
        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não autorizada.' })
        }

        await usersService.updateseqPlay(id, seqPlay)

        return res.status(201).send(user.SeqPlay)
    }
    catch (erro) {
        console.log(erro)
    }

}

export default { playcor }