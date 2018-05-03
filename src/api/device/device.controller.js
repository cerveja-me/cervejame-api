import httpStatus from 'http-status'
import { insertDevice } from './device.service'

export async function createDevice (req, res, next) {
  const device = {
    push_token: req.body.push_token,
    app_version: req.body.app_version,
    app_name: req.body.app_name,
    app_os: req.body.app_os,
    phone_model: req.body.phone_model,
    device_uuid: req.body.device_uuid,
    install_uuid: req.body.install_uuid
  }
  try {
    const d = await insertDevice(device)
    res.status(httpStatus.CREATED).json(d)
  } catch (error) {
    next(error)
  }
}
