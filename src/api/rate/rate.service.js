import { CREATE_RATE } from './rate.query'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'
// import { apiTransactionMessage } from '../enums/transactionMessage.enum'

export async function createRate (rate) {
  try {
    const insertRate = new PreparedStatement('insert-rate', CREATE_RATE, [rate.id_sale, rate.who, rate.rate, rate.comment])
    return db.oneOrNone(insertRate)
  } catch (error) {
    throw error
  }
}
