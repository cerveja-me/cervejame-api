import { GET_OPEN_ACTION, CREATE_ACTION, GET_SALE_DATA, GET_SALES_NO_ACTION } from './action.query'
// import { apiTransactionMessage } from '../enums/transactionMessage.enum'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'

export async function getAvailableActions (profile) {
  try {
    const openActions = new PreparedStatement('get-open-actions', GET_OPEN_ACTION, [profile.id_zone])
    let actions = await db.manyOrNone(openActions)
    console.log('openaction -> ', actions)
    if (!actions.length) {
      actions = actions.map(p => {
        if (p.length) {
          return p
        } else {
          p.products = []
          p.products.push({
            img: p.img,
            amount: p.amount,
            name: p.product,
            price: p.payment_value
          })
          return p
        }
      })
    }
    return actions
  } catch (error) {
    throw error
  }
}

export async function createAction (sale, action, seller) {
  try {
    const createAction = new PreparedStatement('create-action', CREATE_ACTION, [sale, action, seller])
    return await db.one(createAction)
  } catch (error) {
    throw error
  }
}

export function getCostumerForPush (idSale) {
  try {
    const getSaleData = new PreparedStatement('get-sale-data', GET_SALE_DATA, [idSale])
    return db.one(getSaleData)
  } catch (error) {
    throw error
  }
}

export function getSalesNoAction () {
  try {
    const getSaleNoData = new PreparedStatement('get-sale-no-data', GET_SALES_NO_ACTION, [])
    return db.manyOrNone(getSaleNoData)
  } catch (error) {
    throw error
  }
}
