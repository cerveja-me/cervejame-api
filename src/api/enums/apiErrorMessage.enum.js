export const apiErrorMessageConstant = {
  FIRST_BUY: {
    code: 1,
    message: 'Este cupom é para novatos no aplicativo',
    title: 'Eu já te conheço!',
    httpStatus: 400
  },
  USER_LIMIT_1: {
    code: 2,
    message: 'Este cupom é válido para ser usado apenas uma vez',
    title: 'Você já usou este cupom!',
    httpStatus: 400
  },
  NO_TOKEN_SUPPLIED: {
    code: 1000,
    message: 'Token não fornecido',
    title: 'Inválido',
    httpStatus: 401
  },
  EXPIRED_OR_INVALID_TOKEN: {
    code: 1001,
    message: 'Token inválido ou expirado',
    title: 'Inválido',
    httpStatus: 403
  }
}
