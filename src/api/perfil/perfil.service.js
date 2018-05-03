import bcrypt from 'bcrypt-nodejs'
import httpStatus from 'http-status'
import db from '../../db/db'
import { INSERT_PERFIL, SELECT_PERFIL_POR_EMAIL } from './perfil.queries'
import { PreparedStatement } from 'pg-promise'
import ErrorHandler from '../../handlers/errorHandler'
import camelize from 'camelize'

export async function inserePerfil (perfil) {
  perfil.senha = bcrypt.hashSync(perfil.senha)
  const insertPerfil = new PreparedStatement('insere-perfil', INSERT_PERFIL)
  insertPerfil.values = [perfil.email, perfil.senha, perfil.ativo]
  try {
    const perfilCriado = await db.one(insertPerfil)
    return camelize(perfilCriado)
  } catch (error) {
    switch (error.code) {
      case '23505':
        throw new ErrorHandler('Já existe um perfil com o e-mail informado', httpStatus.BAD_REQUEST, true, error.code)
    }
    throw new ErrorHandler(`Erro ao tentar cadastrar o perfil. Detalhe(s): ${error.detail}`, httpStatus.BAD_REQUEST, true, error.code)
  }
}

export async function consultaPerfilPorEmail (email) {
  const selectPerfilPorEmail = new PreparedStatement('select-perfil-por-email', SELECT_PERFIL_POR_EMAIL)
  selectPerfilPorEmail.values = [email]
  try {
    const perfilSelecionado = await db.one(selectPerfilPorEmail)
    return camelize(perfilSelecionado)
  } catch (error) {
    throw new ErrorHandler(`Erro ao consultar perfil por email. Detalhe(s): ${error.detail}`, httpStatus.NOT_FOUND, true, error.code)
  }
}
