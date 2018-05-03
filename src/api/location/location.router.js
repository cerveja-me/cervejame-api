import { createLocation, locationChanged } from './location.controller'
import express from 'express'
const router = express.Router()

router.post('/', createLocation)
router.put('/:id', locationChanged)
// router.get('/:id', getUserById)

export default router
