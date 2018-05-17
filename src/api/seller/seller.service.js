import { GET_SELLER_FROM_PROFILE } from './seller.query'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'

export async function getSellerFromProfile (profile) {
  try {
    const getSeller = new PreparedStatement('get-seller-profile', GET_SELLER_FROM_PROFILE, [profile.profile.id])
    return await db.one(getSeller)
  } catch (error) {
    throw error
  }
}
