import httpStatus from 'http-status'
import { inserePerfil, consultaPerfilPorEmail } from './perfil.service'

export async function criaPerfil (req, res, next) {
  const perfil = req.body
  try {
    const perfilCriado = await inserePerfil(perfil)
    res.status(httpStatus.CREATED).json(perfilCriado)
  } catch (error) {
    next(error)
  }
}

export async function buscaPerfilPorEmail (req, res, next) {
  const email = req.params.email
  try {
    const perfil = await consultaPerfilPorEmail(email)
    res.status(httpStatus.OK).json(perfil)
  } catch (error) {
    next(error)
  }
}
