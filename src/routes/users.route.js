import route from "express";
import usersController from "../controllers/users.controller.js"
import authMidd from "../middlewares/auth.middleware.js";
import {validId, validUser} from "../middlewares/global.middleware.js"



const router = route()

router.post("/create", /*middleware*/ usersController.createUser)
router.get("/", usersController.findAllUsers)


router.get("/login/:id", authMidd, validId, validUser, usersController.findUserById)
router.patch("/updt/:id", authMidd, validId, validUser, usersController.updateUser)

export default router