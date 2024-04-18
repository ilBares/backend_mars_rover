# Mars Rover

## Description
This project implements an API for controlling a rover exploring the surface of Mars. The API translates commands sent from Earth into instructions that the rover understands. The rover is given an initial starting point (x,y) and direction (N,S,E,W). It receives a character array of commands, which can include moving forward/backward (f,b) and turning left/right (l,r). The implementation also includes features such as wrapping from one edge of the grid to another and obstacle detection.

## Requirements
- Initial starting point (x,y) and direction (N,S,E,W) of the rover.
- Character array of commands for the rover.
- Commands for moving forward/backward (f,b).
- Commands for turning left/right (l,r).
- Wrapping from one edge of the grid to another.
- Obstacle detection before each move to a new square. If encountering an obstacle, the rover moves up to the last possible point, aborts the sequence, and reports the obstacle.

## Installation
1. Clone the repository: `git clone https://github.com/ilBares/backend_mars_rover.git`
2. Navigate to the project directory: `cd mars-rover`
3. Build the Docker image: `docker build -t mars-rover-node-app .`

## Usage
1. Run the Docker containers: `docker compose up`
2. Send requests to the API endpoints to control the rover and receive responses.

## API Endpoints
- **POST /setup**: Initialize the Mars rover system.

- **POST /initialize_map**: Initialize the map of Mars.
  Sample request body:
  ```json
  {
    "x_map_size": 100,
    "y_map_size": 100
  }
  ```

- **POST /initialize_rover**: Initialize a rover on Mars.
  Sample request body:
  ```json
  {
    "name": "rover1",
    "direction": "N"
  }
  ```

- **POST /move_rover**: Send commands to move the rover.
  Sample equest body:
  ```json
  {
    "name": "rover2",
    "commands": ["b", "r", "f", "f", "r", "b", "b", "l", "f", "f"]
  }
  ```
  
- **POST /get_mars_map**: Get the map of Mars.


## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- DotEnv

## Authors
- [Marco Baresi](https://github.com/ilBares)
