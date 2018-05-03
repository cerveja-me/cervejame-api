import dotenv from 'dotenv'

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development' || NODE_ENV === 'test') dotenv.config()

export default {
  db: {
    user: process.env.DB_USER || 'postgres',
    pass: process.env.DB_PASS || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: (NODE_ENV === 'production') ? process.env.DB_DATABASE : (NODE_ENV === 'development') ? process.env.DB_DEV : (NODE_ENV === 'homolog') ? process.env.DB_HOMOLOG : process.env.DB_TEST
  },
  auth: {
    secret: process.env.JWT_SECRET || 'secret'
  },
  api: {
    port: (NODE_ENV === 'production') ? process.env.API_PORT : 9001
  }
}
