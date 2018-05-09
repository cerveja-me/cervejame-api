import { findVoucher } from './voucher.controller'
import express from 'express'
const router = express.Router()

// router.post('/', createDevice)
router.get('/:code', findVoucher)

export default router
