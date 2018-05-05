import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
import { CreateSaleReq, CheckoutSale, GetSales, CreateSaleReqV2, CheckoutSaleV2 } from './sale.controller'

const router = express.Router()

// router.post('/', CreateSaleReq)
// router.put('/:id', jwtMiddleware, CheckoutSale)
// router.get('/', jwtMiddleware, GetSales)
router.post('/v2/', CreateSaleReqV2)
router.put('/v2/:id', jwtMiddleware, CheckoutSaleV2)

export default router
