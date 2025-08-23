import mongoose from "mongoose"

const RankTotalSchema = new mongoose.Schema(
    {
        Rank: {}
    },
    { timestamps: true }
)

const UserRankTotal = mongoose.model("UserRankTotal", RankTotalSchema)

export default UserRankTotal