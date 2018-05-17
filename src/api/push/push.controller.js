import { getSalesNoAction } from '../action/action.service'
import { onesignal } from './onesignal.push'
import { sms } from './sms.push'
import { call } from './twilio.push'


export function SalesNoAction(req, res) {
    getSalesNoAction()
        .then(sales => {
            oneMinute(sales.filter(s => {
                return s.elapsed === 1
            }))
            twoMinute(sales.filter(s => {
                return s.elapsed === 2
            }))
            threeMinute(sales.filter(s => {
                return s.elapsed === 3
            }))
            fourMinute(sales.filter(s => {
                return s.elapsed === 4
            }))
            fiveMinute(sales.filter(s => {
                return s.elapsed === 5
            }))
            res.send()

        })
}

function oneMinute(sales) {
    for (var i = 0; i < sales.length; i++) {
        pushSeller(sales[i].seller.map(ss => { return ss.push_token }), '09755a5d-c2c6-4501-acca-097a9fe0212e')
    }
}
function twoMinute(sales) {
    for (var i = 0; i < sales.length; i++) {
        pushSeller(sales[i].seller.map(ss => { return ss.push_token }), '5218c181-27b4-45b0-886d-2c3cc84d6232')
        smsSeller(sales[i].topic, 'Pedido a mais de 2 minutos')
    }
}
function threeMinute(sales) {
    for (var i = 0; i < sales.length; i++) {
        pushSeller(sales[i].seller.map(ss => { return ss.push_token }), '4d6bed34-257d-4b03-9185-accc73dca6f7')
        smsSeller(sales[i].topic, 'Pedido a mais de 3 minutos')
    }
}
function fourMinute(sales) {
    for (var i = 0; i < sales.length; i++) {
        pushSeller(sales[i].seller.map(ss => { return ss.push_token }), '5b2ee3df-4d98-4c24-9404-b418a1cfb3e3')
        smsSeller(sales[i].topic, 'Pedido a mais de 4 minutos')
    }
}
function fiveMinute(sales) {
    for (var i = 0; i < sales.length; i++) {
        pushSeller(sales[i].seller.map(ss => { return ss.push_token }), '4acf84dd-3d4e-44d1-a74d-393367975dc9')
        callSeller(sales[i].seller.map(ss => { return ss.phone }))
    }
}

function pushSeller(ids, template) {
    ids = ids.filter(id => { return id !== 'empty' && id != null })
    const fake = {
        app_id: '2c98ff23-918f-4620-939c-ebae678da341',
        template_id: template,
        include_player_ids: ids
    }
    onesignal(fake)
}

function smsSeller(topic, message) {
    const data = {
        topic: topic,
        message: message
    }
    sms(data)
    console.log('manda sms->', data)
}

function callSeller(numbers) {
    for (var i = 0; i < numbers.length; i++) {
        const c = {
            to: numbers[i],
            from: '+5511930054332',
            url: 'https://delicious-spot-9578.twil.io/assets/voice2.xml'
        }
        call(c)
    }

}