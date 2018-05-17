
import { onesignal } from '../push/onesignal.push'
import { getCostumerForPush } from './action.service'
export function actionCreated (id, action) {
  let template = ''
  switch (action) {
    case 1:
      template = '63dd0066-6400-4486-a482-c84aa397fff4'
      break
    case 2:
      template = 'e086ddc0-493c-426c-ba0f-5e7039e4babf'
      break
    case 3:
      template = '0929a045-d37a-4121-8b9d-74d5c3cb4834'
      break
    case 4:
      template = 'ba403c5d-042c-42ff-9545-e44b2e8ddfe8'
      break
    default:
      template = '37cec3b3-e337-4239-9e98-5eaa6f087038'
      break
  }
  getCostumerForPush(id)
    .then(details => {
      notifyCostumer(details.map(p => { return p.push_token }), template)
    })
}

function notifyCostumer (ids, template) {
  const push = {
    app_id: '5d5587e7-348c-4172-8a19-7e01c49daa2a',
    template_id: template,
    include_player_ids: ids
  }
  onesignal(push)
}
