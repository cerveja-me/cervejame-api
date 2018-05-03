import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'
import ErrorHandler from '../../handlers/errorHandler'
import httpStatus from 'http-status'

import { CREATE_LOCATION, FIND_ZONE, UPDATE_LOCATION, FIND_LOCATION_BY_ID } from './location.query'

export async function insertLocation (idDevice, positionGps) {
  try {
    const insertLocation = new PreparedStatement('insert-location', CREATE_LOCATION)
    insertLocation.values = [idDevice, positionGps]
    let location = await db.one(insertLocation)
    return location
  } catch (error) {
    throw error
  }
}

export async function findZone (location) {
  try {
    const findZone = new PreparedStatement('find-zone', FIND_ZONE)
    findZone.values = [location.id]
    let zone = await db.one(findZone)
    return zone
  } catch (error) {
    throw error
  }
}

export async function findLocationByID (id) {
  const findLocation = new PreparedStatement('find-location-id', FIND_LOCATION_BY_ID)
  findLocation.values = [id]
  try {
    let l = await db.one(findLocation)
    return l
  } catch (error) {
    throw error
  }
}

export async function updateLocation (location) {
  const updateLocation = new PreparedStatement('update-location', UPDATE_LOCATION)
  updateLocation.values = [location.position_maps, location.street, location.num, location.complement, location.id]
  try {
    return await db.one(updateLocation)
  } catch (error) {
    throw error
  }
}

export function transformTime (zone, time) {
  const base = new Date(time)
  const date = new Date(base.toString())
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() - date.getDay())
  zone.open = false
  zone.schedule = zone.schedule.map((sch, index) => {
    sch.open = new Date(date.toString())
    sch.open = new Date(sch.open.setDate(sch.open.getDate() + index))
    sch.open = new Date(sch.open.setHours(sch.start.split(':')[0], sch.start.split(':')[1], 0, 0))
    sch.close = new Date(sch.open)
    sch.close.setHours(sch.close.getHours() + parseInt(sch.end))
    if (base.getTime() > sch.open.getTime() && base.getTime() < sch.close.getTime()) {
      sch.active = true
      zone.open = true
    } else {
      sch.active = false
    }
    sch.day = base.getDay() === sch.open.getDay()
    return sch
  })
  return zone
}
