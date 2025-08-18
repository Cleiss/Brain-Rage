import UserMemo from "../models/users.js";

const createUser = (body) => UserMemo.create(body)

const findAllUsers = () => UserMemo.find().sort({ _id: -1 })

const findRankAtual = () => UserMemo.find().sort({
    'Score.ScoreDiario.pontAtual': -1,
    'Score.DiarioAtualizadoEm': -1
}).limit(5)

const findRankTotal = () => UserMemo.find().sort({
    'Score.ScoreTotal.pontTotal': -1,
    'Score.TotalAtualizadoEm': -1
}).limit(5)

const findUserById = (id) => UserMemo.findById(id)

const findUserByEmail = (email) => UserMemo.findOne(email)

const updateSenha = (id, senha) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { senha })

const updatesenhaTokenReset = (id, senhaTokenReset) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { senhaTokenReset })

const updatesenhaTokenExpire = (id, senhaTokenExpire) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { senhaTokenExpire })

const updateToken = (id, senhaTokenReset) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { senhaTokenReset })

const updateUserUsername = (id, username) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { username})

const updateUserSenha = (id, senha) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { senha })

const updateCoin = (id, moedas) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { moedas })

const updateseqServ = (id, seqServ) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { seqServ })

const updateseqPlay = (id, SeqPlay) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { SeqPlay })

const updatepontProv = (id, pontProv) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { $set: { 'Score.ScoreDiario.pontProv': pontProv } })

const updatepontAtual = (id, pontAtual) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { $set: { 'Score.ScoreDiario.pontAtual': pontAtual } })

const updatetempodiario = (id, DiarioAtualizadoEm) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { $set: { 'Score.ScoreDiario.DiarioAtualizadoEm': DiarioAtualizadoEm } })

const updatepontTotal = (id, pontTotal) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { $set: { 'Score.ScoreTotal.pontTotal': pontTotal } })

const updatetempototal = (id, TotalAtualizadoEm) =>
    UserMemo.findByIdAndUpdate({ _id: id }, { $set: { 'Score.ScoreTotal.TotalAtualizadoEm': TotalAtualizadoEm } })

const confirmById = (id) => UserMemo.findById(id)


export default {
    createUser, findAllUsers, findUserById, findUserByEmail,
    updateUserUsername, updateUserSenha, updateseqServ, updateseqPlay, confirmById,
    updatepontProv, updatepontTotal, updatepontAtual, updatetempodiario, updatetempototal, findRankAtual, findRankTotal,
    updateCoin, updateSenha, updatesenhaTokenReset, updatesenhaTokenExpire, updateToken
}