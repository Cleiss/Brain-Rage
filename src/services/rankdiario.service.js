import UserRankDiario from "../models/rankdiario.js";

const createRank = (Rank) => UserRankDiario.create(Rank)

const findRankDiarioAnterior = () => UserRankDiario.find().sort({ _id: -1 })

export default {createRank, findRankDiarioAnterior}