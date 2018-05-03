import { CREATE_FACEBOOK } from './facebook.query'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'

export async function createFacebook (facebook) {
  const insertFacebook = new PreparedStatement('insert-facebook', CREATE_FACEBOOK, [facebook.id_profile, facebook.facebook_token, facebook.facebook_id])
  try {
    return await db.one(insertFacebook)
  } catch (error) {
    throw error
  }
}
