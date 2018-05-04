// import pool from '../../database/database'
import {
  CREATE_SALE,
  CREATE_SALE_ACTION,
  CREATE_SALE_PAYMENT,
  CONFIRM_SALE,
  GET_SALES,
  SALE_DATA,
  FIND_SALE_ON_PAYMENT,
  INSERT_PRODUCT_ON_SALE
} from './sale.query'
import {
  apiTransactionMessage
} from '../enums/transactionMessage.enum'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'

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
  const price = sale.products.map(p => { return p.price * p.amount }).reduce((a, b) => { return a + b })
  const amount = sale.products.map(p => { return p.amount }).reduce((a, b) => { return a + b })
  const insertSale = new PreparedStatement('insert-sale', CREATE_SALE, [sale.location, sale.products[0].id, price, amount, sale.amount_discount, sale.freight_value])
  try {
    const r = await db.one(insertSale)
    const inserts = sale.products.map(p => {
      const insertProduct = new PreparedStatement('insert-product-sale', INSERT_PRODUCT_ON_SALE, [r.id, p.id, p.price, p.amount, p.price * p.amount, 0])
      db.oneOrNone(insertProduct)
    })
    await Promise.all(inserts)
    console.log('sale -> ', sale.products, price, amount, r)

    return r
  } catch (error) {

  }
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

export function createSalePayment (idSale, paymentType, paymentValue) {
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
