import route from "express"
import login from "../controllers/auth.controller.js"

const router = route()

router.post("/", login)

export default router