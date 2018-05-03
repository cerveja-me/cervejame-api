import express from 'express'
import perfilRouter from '../api/perfil/perfil.router'
import deviceRouter from '../api/device/device.router'
import locationRouter from '../api/location/location.router'
import voucherRouter from '../api/voucher/voucher.router'

const router = express.Router()

// router.use('/', (req, res) => { res.send('OK') })
// commom
router.use('/perfil', perfilRouter)
router.use('/device', deviceRouter)

// mobile
router.use('/location', locationRouter)
router.use('/voucher', voucherRouter)

export default router
