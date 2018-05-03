import httpStatus from 'http-status'
import { findVoucherByCode } from './voucher.services'

export async function findVoucher (req, res) {
  try {
    let voucher = await findVoucherByCode(req.params.code)

    res.json(voucher)
  } catch (e) {
    res.status(httpStatus.BAD_REQUEST).json(e)
  }
}
