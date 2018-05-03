import config from '../config/config'
import Promise from 'bluebird'

const initOptions = {
  promiseLib: Promise,
  connect (client, dc, isFresh) {
    const cp = client.connectionParameters
    console.log('Conectado na base de dados:', cp.database)
  },
  error (err, e) {
    if (err) {
      console.log(e.query)
    }
  },
  query (e) {
    console.log('QUERY:', e.query)
  }
}
const connectionConfig = {
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.database,
  poolSize: 10,
  idleTimeoutMillis: 50000
}
const pgp = require('pg-promise')(initOptions)
const db = pgp(connectionConfig)

export default db
