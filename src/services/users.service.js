import Users from "../models/users.js";

const CreateUserService = (body) => Users.create(body)

export default {CreateUserService}