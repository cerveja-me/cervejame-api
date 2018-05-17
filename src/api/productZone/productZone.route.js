import { GetProductsZone, SetStatusProductsZone } from './productZone.controller'
import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
import { sellerMiddleware } from '../middlewares/seller.middleware'

const router = express.Router()

router.get('/', jwtMiddleware, sellerMiddleware, GetProductsZone)
router.put('/:id', jwtMiddleware, sellerMiddleware, SetStatusProductsZone)

export default router
