import { GetActions, CreateAction } from '../action/action.controller'
import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
import { sellerMiddleware } from '../middlewares/seller.middleware'

const router = express.Router()

router.get('/', jwtMiddleware, sellerMiddleware, GetActions)
router.post('/', jwtMiddleware, sellerMiddleware, CreateAction)
export default router
