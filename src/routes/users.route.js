import route from "express";
import UsersController from "../controllers/users.controller.js";


const router = route()


router.post("/", /*middleware*/ UsersController.CreateUser)

export default router