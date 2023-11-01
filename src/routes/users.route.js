import route from "express";
import UsersController from "../controllers/users.controller.js";


const router = route()

router.post("/", /*middleware*/ UsersController.CreateUser)
router.get("/", /*middleware*/ UsersController.ReadUsers)

export default router