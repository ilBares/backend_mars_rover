import dotenv from 'dotenv'

import express from 'express'
import setupRouter from './routes/setup.js'
import initializeMapRouter from './routes/initialize_map.js'
import initializeRoverRouter from './routes/initialize_rover.js'
import moveRoverRouter from './routes/move_rover.js'
import marsMap from './routes/mars_map.js'

dotenv.config()

const port = parseInt(process.env.PORT) || 3000

const app = express()
app.use(express.json())

app.use('/setup', setupRouter)
app.use('/initialize_map', initializeMapRouter)
app.use('/initialize_rover', initializeRoverRouter)
app.use('/move_rover', moveRoverRouter)
app.use('/get_mars_map', marsMap)

app.listen(port, () => console.log(`Server has started on port: ${port}`))
