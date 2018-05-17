import { SalesNoAction } from './push.controller'
import express from 'express'
// import { jwtMiddleware } from '../middlewares/jwt.middleware'
// import { sellerMiddleware } from '../middlewares/seller.middleware'

const router = express.Router()

router.get('/', SalesNoAction)

export default router
