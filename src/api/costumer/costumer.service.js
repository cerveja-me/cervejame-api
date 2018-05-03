import { CREATE_COSTUMER, UPDATE_COSTUMER_PHONE, GET_COSTUMER_BY_ID, CREATE_MY_VOUCHER, UPDATE_COSTUMER_VOUCHER } from './costumer.query'
import { generateVoucher } from './costumer.helper'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'

export async function createCostumer (costumer) {
  const insertCostumer = new PreparedStatement('insert-costumer', CREATE_COSTUMER, [costumer.id_profile, costumer.name, costumer.photo, costumer.email, costumer.phone])
  try {
    return await db.one(insertCostumer)
  } catch (error) {
    throw error
  }
}

export async function updateCostumer (phone, idProfile) {
  const upCostumer = new PreparedStatement('update-costumer', UPDATE_COSTUMER_PHONE, [phone, idProfile])
  try {
    return await db.one(upCostumer)
  } catch (error) {
    throw error
  }
}

export async function getCostumer (idProfile) {
  const findCostumer = new PreparedStatement('find-costumer', GET_COSTUMER_BY_ID, [idProfile])
  try {
    return await db.one(findCostumer)
  } catch (error) {
    throw error
  }
}

export async function createMyVoucher (idCostumer, name) {
  let v = generateVoucher(name)
  const insertVoucher = new PreparedStatement('insert-voucher-costumer', CREATE_MY_VOUCHER, [idCostumer, v, name])
  try {
    let voucher = await db.one(insertVoucher)
    const updateCostVoucher = new PreparedStatement('update-cost-voucher', UPDATE_COSTUMER_VOUCHER, [voucher.id])
    return await db.one(updateCostVoucher)
  } catch (error) {
    throw error
  }
}
