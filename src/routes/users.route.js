import route from "express";
import usersController from "../controllers/users.controller.js"
import {validId, validUser} from "../middlewares/users.middleware.js" 


const router = route()

router.post("/create", /*middleware*/ usersController.createUser)
router.get("/", usersController.findAllUsers)
router.get("/:id", validId, validUser, usersController.findUserById)
router.patch("/updt/:id", validId, validUser, usersController.updateUser)

export default router