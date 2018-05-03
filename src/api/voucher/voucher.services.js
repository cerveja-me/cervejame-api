import { FIND_VOUCHER, FIND_VOUCHER_BY_ID, VERIFY_VOUCHER_FIRST_BUY, VERIFY_VOUCHER_USER_LIMIT_1, CREATE_SALE_VOUCHER, CREATE_VOUCHER_DEBIT } from './voucher.query'
import { ruleConstant } from '../enums/rule.enum'
import { apiTransactionMessage } from '../enums/transactionMessage.enum'
import { apiErrorMessageConstant } from '../enums/apiErrorMessage.enum'
import { errorConstant } from '../enums/error.enum'
// import { getCostumer } from '../costumer/costumer.service'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'

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
// TODO
// export function applyVoucher (sale, voucher, profile) {
//   return new Promise(async (resolve, reject) => {
//     const rule = voucher.rule
//     let queryData = []
//     let query
//     let message
//     switch (rule) {
//       case ruleConstant.FIRST_BUY.code:
//         query = VERIFY_VOUCHER_FIRST_BUY
//         queryData = [profile.profile.id]
//         message = errorConstant.FIRST_BUY
//         break
//       case ruleConstant.USER_LIMIT_1.code:
//         query = VERIFY_VOUCHER_USER_LIMIT_1
//         queryData = [profile.profile.id, voucher.id]
//         message = errorConstant.USER_LIMIT_1
//         break
//       case ruleConstant.FRIEND_REF.code:
//         try {
//           c = await getCostumer(profile.profile.id)
//           console.log(e)
//           if (c.id === vouche.id) reject(new Error('Você não pode usar seu próprio CUPOM!'))
//         } catch (error) {
//           console.log(error)
//         }
//         query = VERIFY_VOUCHER_FIRST_BUY
//         queryData = [profile.profile.id]
//         message = errorConstant.FRIEND_REF
//         break
//       default:
//         reject(new Error('Regra inválida'))
//     }
//     pool.connect((err, client, done) => {
//       if (err) {
//         done()
//         reject(new Error(err.message))
//       }
//       pool.query(query, queryData, (err, result) => {
//         if (err) {
//           done()
//           reject(new Error(err.message))
//         }
//         if (result.rows.length > 0) {
//           console.log('result', result.rows)
//           if (result.rows[0].total == 0) {
//             pool.query(CREATE_SALE_VOUCHER, [sale, voucher.id, voucher.value], (err, result) => {
//               if (err) {
//                 done()
//                 reject(new Error(err.message))
//               }
//               done()
//               if (rule === ruleConstant.FRIEND_REF.code) {
//                 pool.query(CREATE_VOUCHER_DEBIT, [sale, voucher.id, 10], (err, result) => {
//                   if (err) {
//                     done()
//                     reject(new Error(err.message))
//                   }
//                   done()
//                 })
//               }
//               resolve(apiTransactionMessage.TRANSACTION_COMMITED)
//             })
//           } else {
//             reject(new Error(message))
//           }
//         } else {
//           message = {
//             code: 0,
//             title: 'Erro',
//             message: 'Não houve retorno da consulta',
//             httpStatus: 400
//           }
//           reject(new Error(message))
//         }
//       })
//     })
//   })
// }

// TODO
// export function createVoucherDebit (sale, referral, value) {
//   return new Promise((resolve, reject) => {
//     pool.connect((err, client, done) => {
//       if (err) {
//         done()
//         reject(new Error(err.message))
//       }
//       pool.query(CREATE_VOUCHER_DEBIT, [sale, referral, value], (err, result) => {
//         if (err) {
//           done()
//           reject(new Error(err.message))
//         }
//         done()
//         resolve(apiTransactionMessage.TRANSACTION_COMMITED)
//       })
//     })
//   })
// }
