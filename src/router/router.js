import express from 'express'
import perfilRouter from '../api/perfil/perfil.router'

const router = express.Router()
router.use('/', (req, res) => { res.send('OK') })
router.use('/perfil', perfilRouter)
export default router
