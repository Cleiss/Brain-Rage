import Users_BrainRage from "../models/users.js";

const createUser = (body) => Users_BrainRage.create(body)

const findAllUsers = () => Users_BrainRage.find().sort({ _id: -1 })

const findUserById = (id) => Users_BrainRage.findById(id)

const updateUser = (id, nome, sobrenome, email, username,
    senha, pix, moedas) => Users_BrainRage.findOneAndUpdate({ _id: id }, {
        nome, sobrenome, email, username,
        senha, pix, moedas})

const updateseqServ = (id, seqServ) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {seqServ})

const updateseqPlay = (id, SeqPlay) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {SeqPlay})

const updatepont_prov = (id, pont_prov) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {pont_prov})

const updatepont_total = (id, pont_total) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {pont_total})

const updatepont_atual = (id, pont_atual) => 
    Users_BrainRage.findByIdAndUpdate({ _id: id }, {pont_atual})

const confirmById = (id) => Users_BrainRage.findById(id)


export default { createUser, findAllUsers, findUserById,
     updateUser, updateseqServ, updateseqPlay, confirmById,
    updatepont_prov, updatepont_total, updatepont_atual }