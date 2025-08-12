import UserRankDiario from "../models/rankdiario.js";

const createRank = (Rank) => UserRankDiario.create(Rank)

const findAllRanks = () => UserRankDiario.find().sort({ _id: -1 })

export default {createRank, findAllRanks}