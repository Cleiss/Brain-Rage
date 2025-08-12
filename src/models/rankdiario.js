import mongoose from "mongoose"

const RankDiarioSchema = new mongoose.Schema(
    {
        Rank: {}
    },
    { timestamps: true }
)

const UserRankDiario = mongoose.model("UserRankDiario", RankDiarioSchema)

export default UserRankDiario