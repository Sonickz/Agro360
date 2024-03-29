import { Router } from 'express'
import { login, register, forgetPassword, resetPassword, profile, verifyToken, } from '../controllers/auth.controller.js'
import { validate, validateTokenCookie, validateTokenParam} from '../middlewares/middlewares.js'
import { registerValidator, loginValidator, passwordValidator, emailValidator } from '../validators/auth.validators.js'

const router = Router()

//* Auth
router.post("/login", validate(loginValidator), login)
router.post("/register", validate(registerValidator), register)
router.post("/forget-password", validate(emailValidator), forgetPassword)
router.post("/reset-password/:token", validateTokenParam, validate(passwordValidator), resetPassword)

//* Verify and profile
router.get("/verify/:token", verifyToken)
router.get("/profile", validateTokenCookie, profile)

export default router