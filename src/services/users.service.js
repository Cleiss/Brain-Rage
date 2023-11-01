import Users_BrainRage from "../models/users.js";

const Create = (body) => Users_BrainRage.create(body)

const ReadAll = () => Users_BrainRage.find().sort({_id: -1})

export default {Create, ReadAll}