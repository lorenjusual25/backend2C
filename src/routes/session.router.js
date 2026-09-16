import {Router} from 'express'
import {findAllSessions,createSession,findSessionsByEvent,register,login, getCurrentUser,logout} from '../controllers/session.controller.js'
import { authMiddleware } from '../middlewares/authentication.middleware.js'
const router = Router()
router.get('/', findAllSessions)
router.post('/createSession',createSession)
router.get('/current',authMiddleware,getCurrentUser)
router.get('/eventId/:eventId',findSessionsByEvent)
router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
export default router