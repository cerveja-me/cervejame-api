import { updateCostumer, getCostumer, createMyVoucher } from './costumer.service'

export async function UpdateProfileReq (req, res, next) {
  const phone = req.body.phone
  try {
    let r = await updateCostumer(phone, req.decoded.profile.id)
    res.json(r)
  } catch (error) {
    res.status(500).json(error)
  }
}

export async function getCostumerData (req, res) {
  try {
    let r = await getCostumer(req.decoded.profile.id)
    if (r.id_voucher && r.code) {
      res.json(r)
    } else {
      await createMyVoucher(r.id, r.name)
      res.json(getCostumer(req.decoded.profile.id))
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
