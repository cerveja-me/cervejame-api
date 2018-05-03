import httpStatus from 'http-status'

class ErrorHandler extends Error {
  constructor (message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, codigoErro) {
    super(message)
    this.text_message = message
    this.codigo_erro = codigoErro
    this.status = status
    this.isPublic = isPublic
  }
}
export default ErrorHandler
