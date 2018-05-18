import { GET_PRODUCTS_ZONE, UPDATE_ACTIVE_PRODUCT_ZONE } from './productZone.query'
import { apiTransactionMessage } from '../enums/transactionMessage.enum'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'

export async function getProductsZone (profile) {
  try {
    const getProducts = new PreparedStatement('get-product-zone', GET_PRODUCTS_ZONE, [profile.id_zone])
    return await db.manyOrNone(getProducts)
  } catch (error) {
    throw error
  }
}

export async function setStatusProductsZone (profile, product) {
  try {
    const updateProd = new PreparedStatement('update-prod', UPDATE_ACTIVE_PRODUCT_ZONE, [product.active, product.id, profile.id_zone])
    return await db.oneOrNone(updateProd)
  } catch (error) {
    throw error
  }
}
