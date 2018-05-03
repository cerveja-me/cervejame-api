import { createDevice } from './device.controller'
import express from 'express'
const router = express.Router()

router.post('/', createDevice)
// router.get('/:id', getUserById)

export default router
