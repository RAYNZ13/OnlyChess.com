const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");
const moveHistoryElement = document.querySelector(".move-history"); 

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            // Create square element with appropriate class
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            // Add piece to the square if it exists
            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === 'w' ? "white" : "black"
                );
                pieceElement.innerHTML = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };

                    // Move the piece
                    handleMove(sourceSquare, targetSource);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });

    if(playerRole === 'b'){
        boardElement.classList.add('flipped');
    }else{
        boardElement.classList.add('remove');
    }
};


const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97+source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97+target.col)}${8 - target.row}`,
        promotion: 'q'
    };

    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicdoePieces = {
        p: "♙",
        r: "♖",
        n: "♘",
        b: "♗",
        q: "♕",
        k: "♚",
        P: "♟",
        R: "♜",
        N: "♞",
        B: "♝",
        Q: "♛",
        K: "♔",
    };

    return unicdoePieces[piece.type] || "";
};


socket.on("playerRole",(role) =>{
    playerRole = role;
    renderBoard();
})


socket.on("spectatorRole",() =>{
    playerRole = null;
    alert("You are in Sepctator Mode");
    renderBoard();
})

socket.on("boardState",(fen) =>{
    chess.load(fen);
    renderBoard();
})

socket.on("move",(fen) =>{
    chess.move(fen);
    renderBoard();
})

socket.on("Checkmate",(winner) => {
    const gameOver =document.querySelector(".game-over");
    gameOver.querySelector(".winner").textContent = `${winner} wins by Checkmate!`;
    gameOver.classList.remove("hidden");
    renderBoard();
})

document.querySelector(".new-game-btn").addEventListener("click", () => {
    socket.emit("resetGame"); // Emit the reset event to the server
});

socket.on("newGame", () => {
    const gameOverScreen = document.querySelector(".game-over");
    gameOverScreen.classList.add("hidden"); // Hide the game-over screen
    clearMoveHistory();
    renderBoard(); // Re-render the board
});

socket.on("gameOver", (message) => {
    const gameOverScreen = document.querySelector(".game-over");
    gameOverScreen.querySelector(".winner").textContent = message;
    gameOverScreen.classList.remove("hidden"); // Show the game-over screen
});


socket.on("moveHistory", (history) => {
    updateMoveHistory(history); 
});

const updateMoveHistory = (history) => {
    const moveTitle = document.querySelector(".move_title");
    moveHistoryElement.innerHTML = ""; 
    moveHistoryElement.appendChild(moveTitle);

    history.forEach((move, index) => {
        const moveElement = document.createElement("div");
        moveElement.textContent = `${index + 1}. ${move.from} to ${move.to}`;
        moveHistoryElement.appendChild(moveElement);
    });
};

function clearMoveHistory(){
    const moveHistoryElement = document.querySelector(".move-history");
    if(moveHistoryElement){
        moveHistoryElement.innerHTML = "";
    }
}