import { getProductsZone, setStatusProductsZone } from './productZone.service'
import { decodeToken } from '../middlewares/jwt.middleware'

export async function GetProductsZone (req, res, next) {
  try {
    let p = await getProductsZone(req.seller)
    let list = [{
      title: 'Ativos',
      products: p.filter(o => o.active)
    }, {
      title: 'Inativos',
      products: p.filter(o => !o.active)
    }]
    res.json(list)
  } catch (error) {
    next(error)
  }
}

export async function SetStatusProductsZone (req, res, next) {
  try {
    let p = await setStatusProductsZone(req.seller, req.body)
    res.json(p)
  } catch (error) {
    next(error)
  }
}
