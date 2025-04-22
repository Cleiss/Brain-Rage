import usersService from "../services/users.service.js"

const criarcor = async (req, res) => {

    try {

        const id = req.userId
        //console.log(id)

        const user = await usersService.findUserById(id)
        //console.log(user)

        const cor = Math.floor(Math.random() * 5)
        const seqServ = user.seqServ
        seqServ.push(cor)

        
        if (!id || !user) {
            return res.status(401).send({ message: 'Solicitação não autorizada.' })
        }

        await usersService.updateseqServ(id, seqServ)
        return res.status(201).send(user.seqServ)
    }
    catch (erro) {
        console.log(erro)
    }

}

export default { criarcor }