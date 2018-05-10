import { createRate } from './rate.service'

export async function CreateRateReq (req, res, next) {
  const rate = req.body
  try {
    res.json(await createRate(rate))
  } catch (error) {
    next(error)
  }
}
