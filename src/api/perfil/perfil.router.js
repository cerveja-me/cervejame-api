import { Router } from 'express'
import { criaPerfil, buscaPerfilPorEmail } from './perfil.controller'

const routes = new Router()

routes.post('/', criaPerfil)
routes.get('/email/:email', buscaPerfilPorEmail)

export default routes
