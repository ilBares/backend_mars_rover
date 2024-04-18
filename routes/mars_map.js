import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const map = await pool.query(/*sql*/`SELECT * FROM mars`)
    res.status(200).send({
      map: map.rows
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
