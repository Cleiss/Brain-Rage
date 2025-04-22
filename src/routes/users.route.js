import route from "express";
import usersController from "../controllers/users.controller.js"
import {authMidd, validId, validUser} from "../middlewares/auth.middleware.js";
import gameController from "../controllers/game.controller.js";
import playController from "../controllers/play.controller.js";
import confgame from "../controllers/confirm.controller.js"


const router = route()

router.post("/create", /*middleware*/ usersController.createUser)
router.get("/", usersController.findAllUsers)


router.get("/loc", authMidd, validId, validUser, usersController.findUserById)
router.patch("/updt/user", authMidd, validId, validUser, usersController.updateUser)

router.patch("/updt/cor", authMidd, validId, validUser, gameController.criarcor)
router.patch("/updt/playcor", authMidd, validId, validUser, playController.playcor)
router.get("/confirm", authMidd, validId, validUser, confgame.confirmgame)

export default router