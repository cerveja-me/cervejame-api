// import pool from '../../database/database'
import {
  CREATE_SALE,
  CREATE_SALE_ACTION,
  CREATE_SALE_PAYMENT,
  CONFIRM_SALE,
  GET_SALES,
  SALE_DATA,
  FIND_SALE_ON_PAYMENT,
  INSERT_PRODUCT_ON_SALE,
  SALE_BY_ID
} from './sale.query'
import {
  apiTransactionMessage
} from '../enums/transactionMessage.enum'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'
import ErrorHandler from '../../handlers/errorHandler'
import httpStatus from 'http-status'
import { apiErrorMessageConstant } from '../enums/apiErrorMessage.enum'

export function createSale (sale) {
  // return new Promise((resolve, reject) => {
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(CREATE_SALE, [sale.location, sale.product, sale.price, sale.amount, sale.amount_discount, sale.freight_value], (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       resolve(result.rows[0])
  //     })
  //   })
  // })
}

export async function createSaleV2 (sale) {
  const price = sale.icebox.map(p => { return p.price * p.items }).reduce((a, b) => { return a + b })
  const items = sale.icebox.map(p => { return p.items }).reduce((a, b) => { return a + b })
  const insertSale = new PreparedStatement('insert-sale', CREATE_SALE, [sale.location, sale.icebox[0].id, price, items, sale.amount_discount || 0, sale.freight_value])
  try {
    const r = await db.one(insertSale)
    const inserts = sale.icebox.map(p => {
      const insertProduct = new PreparedStatement('insert-product-sale', INSERT_PRODUCT_ON_SALE, [r.id, p.id, p.price, p.items, p.price * p.items, 0])
      db.oneOrNone(insertProduct)
    })
    await Promise.all(inserts)
    console.log('sale -> ', sale.icebox, price, items, r)

    return r
  } catch (error) {

  }
}

export async function validadePayment (sale) {
  if (sale.payment === 1 || sale.payment === 2) {
    return true
  } else {
    let e = apiErrorMessageConstant.INVALID_PAYMENT
    throw new ErrorHandler(e.message, e.status, true, e.code)
  }
}

export async function getSaleInfo (id) {
  const getSale = new PreparedStatement('get-sale', SALE_BY_ID, [id])
  try {
    return await db.one(getSale)
  } catch (error) {
    // throw
  }
}

export async function createSalePayment (idSale, paymentType, paymentValue) {
  const salePayment = new PreparedStatement('sale-payment', CREATE_SALE_PAYMENT, [idSale, paymentType, paymentValue])
  try {
    return await db.one(salePayment)
  } catch (error) {

  }
  // return new Promise((resolve, reject) => {
  //   const queryData = [idSale, paymentType, paymentValue]
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(CREATE_SALE_PAYMENT, queryData, (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       done()
  //       resolve(apiTransactionMessage.TRANSACTION_COMMITED)
  //     })
  //   })
  // })
}

export function createSaleAction (idSale, action) {
  // return new Promise((resolve, reject) => {
  //   const queryData = [idSale, action]
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(CREATE_SALE_ACTION, queryData, (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       done()
  //       resolve(result.rows[0])
  //     })
  //   })
  // })
}

export function confirmSale (idLocation, idProductZone, price, amount, amountDiscount, idSale) {
  // return new Promise((resolve, reject) => {
  //   const queryData = [idLocation, idProductZone, price, amount, amountDiscount, idSale]
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(CONFIRM_SALE, queryData, (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       done()
  //       resolve()
  //     })
  //   })
  // })
}
export function findSaleOnSalePaymet (idSale) {
  // return new Promise((resolve, reject) => {
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(FIND_SALE_ON_PAYMENT, [id_sale], (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       resolve(result.rows)
  //     })
  //   })
  // })
}

export function getSales (userId) {
  // console.log('id_', userId)
  // return new Promise((resolve, reject) => {
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(GET_SALES, [userId], (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       done()
  //       resolve(result.rows)
  //     })
  //   })
  // })
}

export function getSaleDetails (idsale) {
  // return new Promise((resolve, reject) => {
  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       done()
  //       reject(err)
  //     }
  //     client.query(SALE_DATA, [idsale], (err, result) => {
  //       if (err) {
  //         done()
  //         reject(err)
  //       }
  //       done()
  //       resolve(result.rows)
  //     })
  //   })
  // })
}
