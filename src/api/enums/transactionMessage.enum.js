export const apiTransactionMessage = {
  TRANSACTION_COMMITED: {
    code: 1000,
    message: 'Transação efetuada com sucesso',
    flag: true
  },
  TRANSACTION_ERROR: {
    code: 1001,
    message: 'Erro ao realizar transação',
    flag: false
  }
}
