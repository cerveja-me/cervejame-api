import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
import { getSellerData } from './seller.controller'
import { sellerMiddleware } from '../middlewares/seller.middleware'

const router = express.Router()

router.get('/', jwtMiddleware, sellerMiddleware, getSellerData)
export default router
