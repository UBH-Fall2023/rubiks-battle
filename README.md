# [Click this Link to go to game](https://hackathon-cube.web.app/)





## How to use 
The rubik's cube is controlled with the keyboard. Pres I/K to do R/R', etc. Full list of moves:
```
Rubik's cube notation - Key to press
R R' - I & K
L L' - D & E
F F' - G & H
U U' - J & F
D D' - S & L
M M' - 5 & X

Wide R moves - U & M
Wide L moves - R & V
Wide D moves - Z
Wide U moves - C & ,

X rotation - T & B
Y rotation - A & ;
Z rotation - Q & P
```

## What it does
Virtual rubik's cube you can control with your keyboard. You can also race against others in realtime.

## How I built it
I used three.js for the cube and Firebase for the multiplayer. Firebase is certainly not the best solution, but it works so whatever.

## Challenges I ran into
I struggled for like 3 hours getting the rotation of the cube to work and was buried in quaternion math.
I also had a hard time with detecting if it was solved. While I did figure it out in the end, I ran out of time to implement a timer, so it was useless.
Setting up Firebase also proved challenging.

## Accomplishments that I'm proud of
The movement feels pretty fluid and the realtime multiplayer aspect is cool.

## Inspiration
https://cstimer.net/ has a virtual cube that was the main inspiration.


---



#### To run locally
1. clone git repo
2. Navigate to the file in the terminal: `cd path/to/file`
3. Run the folowing
    ```powershell
    # install dependencies
    npm install
    # run the program
    npx vite
    ```


