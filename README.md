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