import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, direction } = req.body
  
  const x = 0
  const y = 0

  try {
    await pool.query(/*sql*/`INSERT INTO rovers (name, x_position, y_position, direction) VALUES ($1, $2, $3, $4)`, [name, x, y, direction])
    res.status(200).send({
      message: `Successfully initialized {${name}} rover with starting direction {${direction}} and default position (${x}, ${y})`
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
