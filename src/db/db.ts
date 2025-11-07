import { createPool } from 'mysql2/promise'

const config = {
  host: 'database.grupogmvb.com',
  user: 'jobsmv',
  password: 'STRisEwidabA',
  database: 'grupogmvb',
  timezone: '-03:00',
  connectionLimit: 10
}

const pool = createPool(config)

export default pool
