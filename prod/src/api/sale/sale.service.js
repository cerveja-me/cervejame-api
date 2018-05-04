'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.createSale=createSale;exports.createSaleV2=createSaleV2;exports.createSaleAction=createSaleAction;exports.createSalePayment=createSalePayment;exports.confirmSale=confirmSale;exports.findSaleOnSalePaymet=findSaleOnSalePaymet;exports.getSales=getSales;exports.getSaleDetails=getSaleDetails;var _sale=require('./sale.query');var _transactionMessage=require('../enums/transactionMessage.enum');var _db=require('../../db/db');var _db2=_interopRequireDefault(_db);var _pgPromise=require('pg-promise');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}// import pool from '../../database/database'
function createSale(sale){// return new Promise((resolve, reject) => {
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
}async function createSaleV2(sale){const price=sale.products.map(p=>{return p.price*p.amount}).reduce((a,b)=>{return a+b});const amount=sale.products.map(p=>{return p.amount}).reduce((a,b)=>{return a+b});const insertSale=new _pgPromise.PreparedStatement('insert-sale',_sale.CREATE_SALE,[sale.location,sale.products[0].id,price,amount,sale.amount_discount,sale.freight_value]);try{const r=await _db2.default.one(insertSale);const inserts=sale.products.map(p=>{const insertProduct=new _pgPromise.PreparedStatement('insert-product-sale',_sale.INSERT_PRODUCT_ON_SALE,[r.id,p.id,p.price,p.amount,p.price*p.amount,0]);_db2.default.oneOrNone(insertProduct)});await Promise.all(inserts);console.log('sale -> ',sale.products,price,amount,r);return r}catch(error){}}function createSaleAction(idSale,action){// return new Promise((resolve, reject) => {
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
}function createSalePayment(idSale,paymentType,paymentValue){// return new Promise((resolve, reject) => {
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
}function confirmSale(idLocation,idProductZone,price,amount,amountDiscount,idSale){// return new Promise((resolve, reject) => {
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
}function findSaleOnSalePaymet(id_sale){// return new Promise((resolve, reject) => {
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
}function getSales(userId){// console.log('id_', userId)
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
}function getSaleDetails(idsale){// return new Promise((resolve, reject) => {
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