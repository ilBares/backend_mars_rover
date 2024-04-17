import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'rover',
  password: 'rover123',
  database: 'marsdb',
})

export default pool