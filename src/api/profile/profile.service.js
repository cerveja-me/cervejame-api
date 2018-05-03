import dotenv from 'dotenv'
import sha1 from 'sha1'
import * as jwt from 'jsonwebtoken'
import { CREATE_PROFILE, FINDONE_BY_ID, FINDONE_BY_LOGIN } from './profile.query'

import { deviceAssignment } from '../device/device.service'
import { PreparedStatement } from 'pg-promise'
import db from '../../db/db'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

export async function insertProfile (profile) {
  profile.password = sha1(profile.password)
  const insertProf = new PreparedStatement('insert-profile', CREATE_PROFILE)
  insertProf.values = [profile.login, profile.password, profile.type]
  try {
    return await db.one(insertProf)
  } catch (error) {
    throw error
  }
}

export async function findOneByID (id) {
  const findone = new PreparedStatement('find-one-by-id', FINDONE_BY_ID, [id])
  try {
    return await db.one(findone)
  } catch (error) {
    throw error
  }
}

const secret = process.env.JWT_SECRET

export async function auth (credential, password, deviceId, type) {
  const loginUser = new PreparedStatement('login-user', FINDONE_BY_LOGIN, [credential, sha1(password)])
  try {
    let profile = await db.one(loginUser)
    await deviceAssignment(profile, deviceId)
    return jwt.sign({ profile }, secret, { expiresIn: '365d' })
  } catch (error) {
    throw new Error('Usuário e/ou senha inválidos')
  }
}
