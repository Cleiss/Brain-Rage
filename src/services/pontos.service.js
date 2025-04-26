import ScoreSchema from "../models/pontos.js";

const createScore = (body) => ScoreSchema.create(body)

const findAllPontos = () => ScoreSchema.find().sort({ _id: -1 }).populate('user')

const findPontosByUserId = (id) => ScoreSchema.findById(id)

const updatepont_prov = (id, pont_prov) =>
    ScoreSchema.findByIdAndUpdate({ _id: id }, { pont_prov })

const updatepont_total = (id, pont_total) =>
    ScoreSchema.findByIdAndUpdate({ _id: id }, { pont_total })

const updatepont_atual = (id, pont_atual) =>
    ScoreSchema.findByIdAndUpdate({ _id: id }, { pont_atual })

const pontos_updatedAt = (id, updatedAt) =>
    ScoreSchema.findByIdAndUpdate({ _id: id }, { updatedAt })

const confirmById = (id) => ScoreSchema.findById(id)

export default {
    createScore, findAllPontos, findPontosByUserId, updatepont_prov,
    updatepont_total, updatepont_atual, pontos_updatedAt, confirmById
}