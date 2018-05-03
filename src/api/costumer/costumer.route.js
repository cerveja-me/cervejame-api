import { UpdateProfileReq, getCostumerData } from './costumer.controller'
import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
const router = express.Router()

router.post('/', jwtMiddleware, UpdateProfileReq)
router.get('/', jwtMiddleware, getCostumerData)
export default router
