import express from 'express'
import pool from './db.js'

const port = 3000

const app = express()
app.use(express.json())

app.post('/setup', async (req, res) => {
  let message = ""
  try {
    // rovers table
    await pool.query(``/*sql*/`
      CREATE TABLE rovers(
        name VARCHAR(255) NOT NULL,
        x_position INT,
        y_position INT,
        direction VARCHAR(1) CHECK (direction IN ('N', 'S', 'E', 'W')),
        PRIMARY KEY (name)
      )
    ```)

    // mars map table
    await pool.query(``/*sql*/`
      CREATE TABLE mars(
        x INT NOT NULL,
        y INT NOT NULL,
        obstacle BOOLEAN,
        PRIMARY KEY (x, y)
      )
    ```)
    res.status(200).send({ message: "Setup completed successfully"})
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/initialize_map', async (req, res) => {
  const { x_map_size, y_map_size } = req.body

  try {
    for (let x = 0; x < x_map_size; x++) {
      for (let y = 0; y < y_map_size; y++) {
        const randomNum = Math.random();

        // Generating random obstacles
        // 0, 0 position cannot have obstacles
        const isObstacle = x != 0 || y != 0 ? randomNum >= 0.8 : false;
        await pool.query(/*sql*/`INSERT INTO mars (x, y, obstacle) VALUES (${x}, ${y}, ${isObstacle})`)
      }
    }
    res.status(200).send({ message: "Successfully initialized mars map" })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.post('/initialize_rover', async (req, res) => {
  const { name, direction } = req.body
  
  const x = 0
  const y = 0

  try {
    await pool.query(/*sql*/`INSERT INTO rovers (name, x_position, y_position, direction) VALUES (${name}, ${x}, ${y}, ${direction})`)
    res.status(200).send({
      message: `Successfully initialized ${name} rover with starting direction ${direction} and default position (${x}, ${y})`
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`))