import db from '../../db/db'
import {PreparedStatement} from 'pg-promise'
import ErrorHandler from '../../handlers/errorHandler'
import httpStatus from 'http-status'
import { FIND_DEVICE_BY_ID, UPDATE_PROFILE_ID_ON_DEVICE, CREATE_DEVICE, FIND_DEVICE, UPDATE_DEVICE } from './device.query'

export async function insertDevice (device) {
  try {
    const findDevice = new PreparedStatement('find-device', FIND_DEVICE, [device.device_uuid, device.app_name, device.install_uuid])
    // console.log('find -> ' )
    let dev = await db.one(findDevice)
    console.log('DEV ---->  ', dev)
    const updateDevice = new PreparedStatement('update-device', UPDATE_DEVICE)
    updateDevice.values = [device.push_token, device.app_version, dev.id]
    dev = await db.one(updateDevice)

    console.log('device -> ', dev)
    return dev
  } catch (error) {
    console.log('ERRO -> ', error)
    try {
      const insertDev = new PreparedStatement('insert-device', CREATE_DEVICE, [device.push_token, device.app_version, device.app_name, device.app_os, device.phone_model, device.device_uuid, device.install_uuid])
      let dev = await db.one(insertDev)

      console.log('inserido -> ', dev)
      return dev
    } catch (error) {
      console.log('error -> ', error)
      throw new ErrorHandler(`Erro ao tentar cadastrar o perfil. Detalhe(s): ${error.detail}`, httpStatus.BAD_REQUEST, true, error.code)
    }
  }
}

export async function deviceAssignment (profile, deviceId) {
  try {
    const findDeviceByID = new PreparedStatement('find-device-by-id', FIND_DEVICE_BY_ID)
    findDeviceByID.values = [deviceId]
    let dev = await db.one(findDeviceByID)
    if (dev.app_name === 2 && profile.type !== 3) {
      throw new ErrorHandler(`Usuário e/ou senha inválidos`, httpStatus.BAD_REQUEST, true, 1002)
    } else {
      const updateProfileDevice = new PreparedStatement('update-profile-device', UPDATE_PROFILE_ID_ON_DEVICE)
      updateProfileDevice.values = [profile.id, deviceId]
      await db.oneOrNone(updateProfileDevice)
      return true
    }
  } catch (error) {
    throw error
  }
}
