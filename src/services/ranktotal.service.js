import UserRankTotal from "../models/rankdiario.js";

const createRankTotal = (Rank) => UserRankTotal.create(Rank)

const findAllRanksTotal = () => UserRankTotal.find().sort({ _id: -1 })

export default {createRankTotal, findAllRanksTotal}