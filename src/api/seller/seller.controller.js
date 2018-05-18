import { getSellerFromProfile } from './seller.service'

export async function getSellerData (req, res, next) {
  try {
    const seller = await getSellerFromProfile(req.decoded)
    res.json(seller)
  } catch (error) {
    next(error)
  }
}
