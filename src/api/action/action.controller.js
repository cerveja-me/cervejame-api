import { getAvailableActions, createAction } from './action.service'
import { actionCreated } from './action.push'

export async function GetActions (req, res, next) {
  try {
    let orders = await getAvailableActions(req.seller)
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

export async function CreateAction (req, res, next) {
  try {
    let act = await createAction(req.body.id_sale, req.body.action, req.seller.id)
    actionCreated(req.body.id_sale, req.body.action)
    res.json(act)
  } catch (error) {
    next(error)
  }
}
