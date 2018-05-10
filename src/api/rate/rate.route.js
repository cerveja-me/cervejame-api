import { CreateRateReq } from './rate.controller'
import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
const router = express.Router()

router.post('/', jwtMiddleware, CreateRateReq)

export default router
