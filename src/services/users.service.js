import Users_BrainRage from "../models/users.js";

const createUser = (body) => Users_BrainRage.create(body)

const findAllUsers = () => Users_BrainRage.find().sort({ _id: -1 })

const findUserById = (id) => Users_BrainRage.findById(id)

const updateUser = (id, nome, sobrenome, email, username,
    senha, pix, moedas, pont_sem, pont_atual, pont_total,
    seqServ, SeqPlay) => Users_BrainRage.findOneAndUpdate({ _id: id }, {
        nome, sobrenome, email, username,
        senha, pix, moedas, pont_total, pont_atual,
        pont_sem, seqServ, SeqPlay
    })

const updateseqServ = (id, seqServ) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {seqServ})

const updateseqPlay = (id, SeqPlay) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {SeqPlay})

const confirmById = (id) => Users_BrainRage.findById(id)


export default { createUser, findAllUsers, findUserById, updateUser, updateseqServ, updateseqPlay, confirmById }