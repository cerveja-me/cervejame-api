import express from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware'
import { CreateSaleReq, CheckoutSale, GetSales } from './sale.controller'

const router = express.Router()

// router.post('/', CreateSaleReq)
// router.put('/:id', jwtMiddleware, CheckoutSale)
// router.get('/', jwtMiddleware, GetSales)
router.post('/v2/', CreateSaleReq)
router.put('/v2/:id', jwtMiddleware, CheckoutSale)
router.get('/v2/', jwtMiddleware, GetSales)

export default router
