import dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
import { apiErrorMessageConstant } from '../enums/apiErrorMessage.enum'
// import { errorConstant } from '../errorHandler/error.enum'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

const secret = process.env.JWT_SECRET

async function validateToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        reject(new Error('faça login novamente'))
      }
      resolve(true)
    })
  })
}

export function decodeToken (token) {
  return jwt.decode(token)
}

export function jwtMiddleware (req, res, next) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    validateToken(token).then(valid => {
      valid ? console.log('valido') : console.log('invalido')
      req.decoded = jwt.decode(token)
      next()
    }).catch(error => {
      next(error)
      // console.log(error)
      // res.status(401).json({code: apiErrorMessageConstant.EXPIRED_OR_INVALID_TOKEN.code, message: apiErrorMessageConstant.EXPIRED_OR_INVALID_TOKEN.message})
    })
  } else {
    res.status(401).json(apiErrorMessageConstant.NO_TOKEN_SUPPLIED)
  }
}
