import httpStatus from 'http-status'
import apiTransactionMessage from '../enums/transactionMessage.enum'
// import serviceCreateHPAction from '../hyperTrack/hyperTrack.service'
import {
  getCostumer,
  validateCostumerPhone}
  from '../costumer/costumer.service'
// import saleCreated from './sale.push'
import {
  createSale,
  createSalePayment,
  findSaleOnSalePaymet,
  getSales,
  createSaleV2,
  validadePayment,
  getSaleInfo,
  validateVoucher,
  validateReferral
} from './sale.service'
import {
  applyVoucher,
  createVoucherDebit
} from '../voucher/voucher.services'

export async function CreateSaleReq (req, res, next) {
  const s = req.body
  createSale(s)
    .then(sale => {
      res.json(sale)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

export async function CreateSaleReqV2 (req, res, next) {
  try {
    let sale = await createSaleV2(req.body)
    res.json(sale)
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(error)
  }
}

export async function CheckoutSaleV2 (req, res, next) {
  const idSale = req.params.id
  const sale = req.body
  const profile = req.decoded

  try {
    await validadePayment(sale)
    // TODO validar se a venda já esta no pagamento
    const savedSale = await getSaleInfo(idSale)
    const phone = await validateCostumerPhone(profile)
    const voucherDiscount = await validateVoucher(sale, savedSale, profile)
    const referralDiscount = await validateReferral(sale, savedSale, profile)
    console.log('descont -> ', voucherDiscount, referralDiscount)

    await createSalePayment(idSale, sale.payment, (parseFloat(savedSale.price) + parseFloat(savedSale.freight_value) - voucherDiscount - referralDiscount))
    console.log('saved', savedSale, sale)
    res.send(savedSale)
  } catch (error) {
    next(error)
  }
  // console.log('venda->', idSale, sale, profile)
  // next()
}
export async function GetSalesV2 (req, res, next) {
  try {
    const profile = req.decoded
    res.send(await getSales(profile.profile.id))
  } catch (error) {
    next(error)
  }
}

export function CheckoutSale (req, res) {
  const idSale = req.params.id
  const sale = req.body
  const voucher = sale.voucher
  const profile = req.decoded

  findSaleOnSalePaymet(idSale)
    .then(s => {
      if (s && s.length) {
        res.send(apiTransactionMessage.TRANSACTION_COMMITED)
      } else {
        let paymentValue = (sale.price - sale.amount_discount + sale.freight_value)
        // TODO: quando for validar o voucher

        if (sale.referral_discount && sale.referral_discount > 0) {
          getCostumer(profile.profile.id)
            .then(c => {
              if (c.available_value >= sale.referral_discount) {
                let v = paymentValue - sale.referral_discount
                createSalePayment(idSale, sale.payment, (v > 0 ? v : 0))
                  .then(result => {
                    createVoucherDebit(idSale, c.id, (sale.referral_discount * -1))
                    saleCreated(idSale)
                    serviceCreateHPAction(sale, idSale)
                    res.json(result)
                  })
                  .catch(e => {
                    console.log(e)
                  })
              } else {
                res.status(400).json({
                  message: 'identificamos uma tentativa de fraude, por favor entre em contato contato@cerveja.me!'
                })
              }
            })
        } else if (voucher) {
          applyVoucher(idSale, voucher, profile)
            .then(transaction => {
              paymentValue -= voucher.value
              createSalePayment(idSale, sale.payment, paymentValue)
                .then(result => {
                  saleCreated(idSale)
                  serviceCreateHPAction(sale, idSale)
                  res.json(result)
                })
                .catch(e => {
                  console.log(e)
                })
            })
            .catch(e => {
              res.status(400).json({
                message: e
              })
            })
        } else {
          createSalePayment(idSale, sale.payment, paymentValue)
            .then(result => {
              saleCreated(idSale)
              serviceCreateHPAction(sale, idSale)
              res.json(result)
            })
            .catch(e => {
              res.status(400).json({
                message: e
              })
            })
        }
      }
    })
}

export function GetSales (req, res) {
  const profile = req.decoded
  getSales(profile.profile.id)
    .then(result => {
      res.json(result)
    })
    .catch(e => {
      console.log(e)
    })
}
