import { createProfile, respondToServer, getProfileByID, authenticate } from './profile.controller'
import express from 'express'

const router = express.Router()

router.post('/', createProfile)
router.get('/:id', getProfileByID)
router.get('/', respondToServer)
router.post('/auth', authenticate)

export default router
