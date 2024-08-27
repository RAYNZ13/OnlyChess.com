
# 𝗢𝗻𝗹𝘆♟𝗖𝗵𝗲𝘀𝘀.𝗰𝗼𝗺



This is a real-time chess game application built using Node.js, Express, Socket.io, Chess.js and vanilla JavaScript. The application supports two players and allows others to join as spectators. The chess game follows standard rules and includes features such as drag-and-drop functionality for moving pieces, real-time updates, and automatic checkmate detection.
# Key Features

* Real-Time Multiplayer: Supports two players with instant move reflection and spectator mode.
* Drag-and-Drop Interface: Intuitive piece movement with role-based controls.
* Automatic Game Management: Handles move validation, checkmate detection, and game state synchronization.
* Persistent Move History: Displays real-time updates of the game’s move history.
* Responsive Design: Adaptable chessboard for desktop and mobile, with automatic board flipping for black players.
* Robust Error Handling: Manages invalid moves and player disconnects, ensuring a smooth game experience.
* Spectator Mode: Allows additional users to watch the game without interfering.

# Pre-requisite
Before you begin, ensure you have the following installed:

Node.js (v14 or later)
npm (Node Package Manager)
# Setup Instructions

### 1. Clone Repository
git clone https://github.com/your-username/chess-game.git
cd chess-game

### 2. Install Dependencies
Navigate to the project directory and install the required dependencies:

npm install

npm -i express socket.io ejs chess.js

### 3. Running the Server
To start the server, run the following command:

npx nodemon

The server will start on http://localhost:3000.

4. Accessing the Application
Once the server is running, you can access the chess game by navigating to http://localhost:3000 in your web browser.
# Client-Side Details

## Client-Side Details
The client-side of the application is responsible for rendering the chessboard, handling user interactions (like dragging and dropping pieces), and communicating with the server via WebSocket (using Socket.io).

## Key functionalities include:

* Rendering the Chessboard: The chessboard is dynamically rendered based on the current game state.
* Handling Moves: Users can drag and drop pieces to make moves. Invalid moves are rejected by the server.
* Updating the Board: The board state is updated in real-time based on moves made by either player.
* Spectator Mode: If two players are already in the game, additional users can join as spectators.



## Key Files
* app.js: The main server file that sets up the Express server, Socket.io, and handles game logic.
* chessGame.js: The client-side JavaScript file responsible for rendering the chessboard, handling moves, and updating the UI.
* index.ejs: The HTML template used to render the game interface.## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Light Square | ![#f0d9b5](https://via.placeholder.com/10/f0d9b5?text=+) #f0d9b5 |
| Dark Square | ![#b58863](https://via.placeholder.com/10/b58863?text=+) #b58863 |
| White Pieces | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| Black Pieces | ![#000000](https://via.placeholder.com/10/000000?text=+) #000000 |
| Board Background | ![#d3c0a3](https://via.placeholder.com/10/d3c0a3?text=+) #d3c0a3 |
| Highlight Color | ![#ffcc00](https://via.placeholder.com/10/ffcc00?text=+) #ffcc00 |
| Text Colot | ![#333333](https://via.placeholder.com/10/333333?text=+) #333333 |


