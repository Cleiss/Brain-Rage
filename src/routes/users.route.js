import route from "express";
import usersController from "../controllers/users.controller.js"
import middleware from "../middlewares/users.middleware.js" 


const router = route()

router.post("/create", /*middleware*/ usersController.createUser)
router.get("/", usersController.findAllUsers)
router.get("/:id", middleware.validId, middleware.validUser, middleware.authMidd, usersController.findUserById)
router.patch("/updt/:id", middleware.validId, middleware.validUser, middleware.authMidd, usersController.updateUser)

export default router