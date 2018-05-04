import { getSellerFromProfile } from '../seller/seller.service'

export function sellerMiddleware (req, res, next) {
  if (req.decoded) {
    getSellerFromProfile(req.decoded)
      .then(seller => {
        req.seller = seller
        next()
      })
  }
}
