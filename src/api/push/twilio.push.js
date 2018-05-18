import request from 'request'

const API_MQ_URL = process.env.API_MQ_URL || 'http://localhost:8081'
const options = {
  url: API_MQ_URL + '/twilio/call',
  headers: {
    'Content-Type': 'application/json'
  }
}

export function call (t) {
    options.json = true
    options.body = t
    console.log('string->',options.body)
    request.post(options, (e, res, body) => {
      if (e) console.log(e)
      if (res) console.log(JSON.stringify(res))
      if (body) console.log(body)
    })
  }