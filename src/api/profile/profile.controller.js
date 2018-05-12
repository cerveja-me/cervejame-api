import { auth, insertProfile, findOneByID } from './profile.service'
import { createCostumer } from '../costumer/costumer.service'
import { createFacebook } from '../facebook/facebook.service'

export async function createProfile (req, res, next) {
  let profile = req.body
  try {
    profile.id_profile = await insertProfile(profile)
    profile.id_profile = profile.id_profile.id
    let costumer = await createCostumer(profile)
    if (profile.type === 2) {
      costumer = await createFacebook(profile)
      res.json(costumer)
    } else {
      res.json(costumer)
    }
  } catch (error) {
    next(error)
  }
}

export async function getProfileByID (req, res, next) {
  const id = req.params.id
  try {
    res.json(await findOneByID(id))
  } catch (error) {
    next(error)
  }
}

export function respondToServer (req, res) {
  res.status(200).json({ message: 'Ok' })
}

export async function authenticate (req, res, next) {
  const { login, password, device_id, type } = req.body
  try {
    let token = await auth(login, password, device_id, type)
    res.json({token: token})
  } catch (error) {
    next(error)
  }
}
