import mongoose from "mongoose"

const ScoreSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users_BrainRage',
            required: true
        },
        pontAtual: {
            type: Number
        },
        pontTotal: {
            type: Number
        },
        pontProv: {
            type: Number
        }
    },
    {timestamps: true}
)

const Score = mongoose.model("Score", ScoreSchema)

export default Score