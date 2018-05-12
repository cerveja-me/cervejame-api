import { FIND_VOUCHER, FIND_VOUCHER_BY_ID, VERIFY_VOUCHER_FIRST_BUY, VERIFY_VOUCHER_USER_LIMIT_1, CREATE_SALE_VOUCHER, CREATE_VOUCHER_DEBIT } from './voucher.query'
import { ruleConstant } from '../enums/rule.enum'
import { apiTransactionMessage } from '../enums/transactionMessage.enum'
import { apiErrorMessageConstant } from '../enums/apiErrorMessage.enum'
import { errorConstant } from '../enums/error.enum'
import { getCostumer } from '../costumer/costumer.service'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'
import ErrorHandler from '../../handlers/errorHandler'

export async function findVoucherByCode (code) {
  const findVoucher = new PreparedStatement('find-voucher', FIND_VOUCHER)
  findVoucher.values = [code]
  try {
    return await db.one(findVoucher)
  } catch (error) {
    throw error
  }
}

export async function verifyVoucherActive (id) {
  const findVoucher = new PreparedStatement('find-voucher-id', FIND_VOUCHER_BY_ID)
  findVoucher.values = id
  try {
    let v = await db.one(findVoucher)
    return v.active
  } catch (error) {
    return false
  }
}

export async function voucherRules (sale, voucher, profile) {
  const rule = voucher.rule
  try {
    switch (rule) {
      case ruleConstant.FIRST_BUY.code:
        const firstBuy = new PreparedStatement('first-buy-rule', VERIFY_VOUCHER_FIRST_BUY, [profile.profile.id])
        if (parseInt((await db.one(firstBuy)).total) > 0) {
          const e = ruleConstant.FIRST_BUY
          throw new ErrorHandler(e.message, e.httpStatus, true, 1003)
        } else {
          return true
        }
      case ruleConstant.USER_LIMIT_1.code:
        const userLimit = new PreparedStatement('one-buy-rule', VERIFY_VOUCHER_USER_LIMIT_1, [profile.profile.id, voucher.id])
        if (parseInt((await db.one(userLimit))) > 0) {
          const e = ruleConstant.USER_LIMIT_1
          throw new ErrorHandler(e.message, e.httpStatus, true, 1003)
        } else {
          return true
        }
      case ruleConstant.FRIEND_REF.code:
        try {
          const c = await getCostumer(profile.profile.id)
          if (c.id === voucher.id) {
            throw new ErrorHandler('Você não pode usar seu próprio CUPOM!', ruleConstant.FRIEND_REF.httpStatus, true, 1004)
          }
        } catch (error) {
          console.log(error)
          throw error
        }
        const firstBuyRef = new PreparedStatement('first-buy-rule', VERIFY_VOUCHER_FIRST_BUY, [profile.profile.id])
        if (parseInt((await db.one(firstBuyRef)).total) > 0) {
          const e = ruleConstant.FIRST_BUY
          throw new ErrorHandler(e.message, e.httpStatus, true, 1003)
        } else {
          return true
        }
      default:
        throw new Error('Regra inválida')
    }
  } catch (error) {
    console.log('error executed->', error)
    throw error
  }
}

export async function createSaleVoucher (sale, voucher, profile) {
  try {
    const insertSaleVoucher = new PreparedStatement('insert-sale-voucher', CREATE_SALE_VOUCHER, [sale.id, voucher.id, voucher.value])
    let r = await db.oneOrNone(insertSaleVoucher)
    if (voucher.rule === ruleConstant.FRIEND_REF.code) {
      createVoucherDebit(sale.id, voucher.id, 10)
    }
    return r
  } catch (error) {
    throw error
  }
}

export async function createVoucherDebit (sale, referral, value) {
  try {
    const inserVoucherDebit = new PreparedStatement('insert-voucher-debit', CREATE_VOUCHER_DEBIT, [sale, referral, value])
    return await db.oneOrNone(inserVoucherDebit)
  } catch (error) {
    throw error
  }
}
