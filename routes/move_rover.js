import express from 'express'
import pool from '../db.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, commands } = req.body

  try {
    const rover = await _getRoverByName(name)
    rover || res.status(404).send({ message: `Rover {${name}} not found` })

    const newPosition = await _calculateNewPosition(rover, commands)
    newPosition || res.status(400).send({ message: "Invalid movement commands" })

    await _updateRoverPosition(rover.name, newPosition)
    
    const message = newPosition.aborted
      ? "Rover movements aborted due to an obstacle"
      : "Rover movements executed successfully"

    res.status(200).send({
      message: message,
      rover: {
        name: rover.name,
        x_position: newPosition.x,
        y_position: newPosition.y,
        direction: newPosition.direction
      }
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

async function _getRoverByName(name) {
  const roverQueryResult = await pool.query(/*sql*/`SELECT * FROM rovers WHERE name = $1`, [name])
  return roverQueryResult.rows[0]
}

async function _calculateNewPosition(rover, commands) {
  let currentDirection = rover.direction
  let currentX = rover.x_position
  let currentY = rover.y_position

  let aborted = false

  const DIRECTIONS = ['N', 'E', 'S', 'W']
  const directionIndex = DIRECTIONS.indexOf(currentDirection)

  for (let command of commands) {
    command = command.toUpperCase()
    switch (command) {
      case 'L':
        currentDirection = DIRECTIONS[(directionIndex + 3) % 4]
        break
      case 'R':
        currentDirection = DIRECTIONS[(directionIndex + 1) % 4]
        break
      case 'F':
      case 'B':
        let delta_x = 0
        let delta_y = 0

        switch (currentDirection) {
          case 'N':
            delta_y = -1
            break
          case 'E':
            delta_x = 1
            break
          case 'S':
            delta_y = 1
            break
          case 'W':
            delta_x = -1
            break
          
        }

        if (command === 'B') {
          delta_x *= -1
          delta_y *= -1
        }

        const xMapSize = parseInt(process.env.X_MAP_SIZE)
        const yMapSize = parseInt(process.env.Y_MAP_SIZE)

        const newX = (currentX + delta_x + xMapSize) % xMapSize
        const newY = (currentY + delta_y + yMapSize) % yMapSize

        if (await _checkDestination(newX, newY)) {
          currentX = newX
          currentY = newY
        } else {
          aborted = true
        }

        break
      default:
        // Invalid command
        return null
    }

    if (aborted) break
  }

  return {
    x: currentX,
    y: currentY,
    direction: currentDirection,
    aborted: aborted,
  }
}

async function _checkDestination(x, y) {
  const newPosition = await pool.query(/*sql*/`SELECT * FROM mars WHERE x = $1 AND y = $2`, [x, y])
  return !newPosition.rows[0].obstacle
}

async function _updateRoverPosition(name, newPosition) {
  await pool.query(/*sql*/`
    UPDATE rovers
    SET x_position = $1, y_position = $2, direction = $3
    WHERE name = $4`,
    [newPosition.x, newPosition.y, newPosition.direction, name]
  )
}

export default router
