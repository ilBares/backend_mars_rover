import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const x_map_size = parseInt(process.env.X_MAP_SIZE)
  const y_map_size = parseInt(process.env.Y_MAP_SIZE)
  // const { x_map_size, y_map_size } = req.body

  try {
    for (let x = 0; x < x_map_size; x++) {
      for (let y = 0; y < y_map_size; y++) {
        const randomNum = Math.random()

        // Generating random obstacles
        // (0, 0) position cannot have obstacles
        const isObstacle = x !== 0 || y !== 0 ? randomNum >= 0.8 : false
        
        await pool.query(/*sql*/`INSERT INTO mars (x, y, obstacle) VALUES ($1, $2, $3)`, [x, y, isObstacle])
      }
    }
    res.status(200).send({ message: "Successfully initialized mars map" })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
