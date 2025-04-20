import Users_BrainRage from "../models/users.js";

const createUser = (body) => Users_BrainRage.create(body)

const findAllUsers = () => Users_BrainRage.find().sort({ _id: -1 })

const findUserById = (id) => Users_BrainRage.findById(id)

const updateUser = (id, nome, sobrenome, email, username,
    senha, pix, moedas, pont_sem, pont_atual, pont_total,
    seqServ, seqPlay) => Users_BrainRage.findOneAndUpdate({ _id: id }, {
        nome, sobrenome, email, username,
        senha, pix, moedas, pont_total, pont_atual,
        pont_sem, seqServ, seqPlay
    })


export default { createUser, findAllUsers, findUserById, updateUser }