import { onesignal } from '../push/onesignal.push'
import { slack } from '../push/slack.push'
import { getSaleDetails } from './sale.service'

export async function saleCreated (id) {
  try {
    let details = await getSaleDetails(id)
    // console.log('details -> ', details)
    // notifySeller(details.map(p => {
    //   return p.push_token
    // }))
    notifySlack(details[0])
  } catch (error) {
    // console.log('error notification ->', error)
  }
}

function notifySeller (ids) {
  ids = ids.filter(id => { return id !== 'empty' && id != null })
  const fake = {
    app_id: '2c98ff23-918f-4620-939c-ebae678da341',
    template_id: 'ffe9131f-46d6-4a0c-bca6-9a38e295b35a',
    include_player_ids: ids
  }
  onesignal(fake)
}

function notifySlack (order) {
  slack(`api-site -> ${JSON.stringify(order.products.map(p => {
    return {
      prod: p.name,
      qtde: p.amount,
      preco: p.price
    }
  }))} frete: ${order.freight_value} Total: R$ ${order.price} em ${order.city} do cliente: ${order.costumer} fone: ${order.phone}`)
  // slack(`api-site -> ${order.amount}  ${order.product} R$ ${order.price} em ${order.city} do cliente: ${order.costumer} fone: ${order.phone}`)
}
