import route from "express";
import usersController from "../controllers/users.controller.js"
import {authMidd, validId, validUser} from "../middlewares/auth.middleware.js";
import gameController from "../controllers/game.controller.js";
import playController from "../controllers/play.controller.js";
import confgame from "../controllers/confirm.controller.js"
import rankController from "../controllers/rank.controller.js";
import seqController from "../controllers/seq.controller.js";

const router = route()

router.post("/create", /*middleware*/ usersController.createUser)
router.get("/", usersController.findAllUsers)
router.get("/ranking", authMidd, validId, validUser, rankController.rankingAtual)
router.get("/rankingtotal", authMidd, validId, validUser, rankController.rankingTotal)
router.get("/timereset", authMidd, validId, validUser, usersController.resetpontAtual)


router.get("/loc", authMidd, validId, validUser, usersController.findUserById)
router.patch("/updt/username", authMidd, validId, validUser, usersController.updateUsername)
router.patch("/updt/userpass", authMidd, validId, validUser, usersController.updateUserPass)

router.patch("/updt/cor", authMidd, validId, validUser, gameController.criarcor)
router.patch("/updt/playcor", authMidd, validId, validUser, playController.playcor)
router.get("/confirm", authMidd, validId, validUser, confgame.confirmgame)

router.patch("/resetseq", authMidd, validId, validUser, seqController.resetSeq)
router.patch("/updtficha", authMidd, validId, validUser, gameController.Fichas)
router.post("/solicitaLink", usersController.solicitaLink)
router.post("/resetasenha/:token/:id", usersController.resetSenha)


export default router