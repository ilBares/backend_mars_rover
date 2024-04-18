import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    await _createRoverTable()
    await _createMarsMapTable()

    res.status(200).send({ message: "Setup completed successfully" })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

async function _createRoverTable() {
  // await pool.query(/*sql*/`DROP TABLE rovers`)
  
  await pool.query(/*sql*/`
    CREATE TABLE rovers(
      name VARCHAR(255) NOT NULL,
      x_position INT,
      y_position INT,
      direction VARCHAR(1) CHECK (direction IN ('N', 'S', 'E', 'W')),
      PRIMARY KEY (name)
    )
  `)
}

async function _createMarsMapTable() {
  // await pool.query(/*sql*/`DROP TABLE mars`)

  await pool.query(/*sql*/`
    CREATE TABLE mars(
      x INT NOT NULL,
      y INT NOT NULL,
      obstacle BOOLEAN,
      PRIMARY KEY (x, y)
    )
  `)
}

export default router
