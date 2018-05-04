import express from 'express'
import profileRouter from '../api/profile/profile.router'
import deviceRouter from '../api/device/device.router'
import locationRouter from '../api/location/location.router'
import voucherRouter from '../api/voucher/voucher.router'
import costumerRouter from '../api/costumer/costumer.router'
import saleRouter from '../api/sale/sale.router'
const router = express.Router()

// router.use('/', (req, res) => { res.send('OK') })
// commom
router.use('/device', deviceRouter)
router.use('/profile', profileRouter)

// mobile
router.use('/location', locationRouter)
router.use('/voucher', voucherRouter)
router.use('/costumer', costumerRouter)

router.use('/sale', saleRouter)

export default router
