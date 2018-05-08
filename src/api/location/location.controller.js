import { insertLocation, findZone, updateLocation, transformTime } from './location.service'

export async function createLocation (req, res, next) {
  const { id_device, position_gps, time } = req.body
  console.log('time -> ', time)
  try {
    let l = await insertLocation(id_device, position_gps)
    try {
      l = await findZone(l)
      l.zone = await transformTime(l.zone, time)
      res.json(l)
    } catch (error) {
      res.json(l)
    }
  } catch (error) {
    next(error)
  }
}

export async function locationChanged (req, res, next) {
  let location = {
    id: req.params.id,
    position_maps: req.body.position_maps || req.body.position_gps,
    street: req.body.street || '',
    num: req.body.num || '',
    complement: req.body.complement || ''
  }

  try {
    console.log('location update', location)
    await updateLocation(location)
    try {
      location = await findZone(location)
      res.json(location)
    } catch (e) {
      res.json(location)
    }
  } catch (error) {
    next(error)
  }
}
