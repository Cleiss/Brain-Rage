import usersService from "../services/users.service.js"

const playcor = async (req, res) => {

    try {

        const id = req.userId
        //console.log(req.id)
        //console.log(id)

        const user = await usersService.findUserById(id)
        console.log(user)

        const cor = Math.floor(Math.random() * 5)
        const seqPlay = user.SeqPlay
        seqPlay.push(cor)

        
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