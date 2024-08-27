const express = require('express');
const socket = require('socket.io');
const http = require('http');
const {Chess} = require('chess.js');
const path = require('path');
const { title, emitWarning } = require('process');

const app = express();
 
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();

let players = {};
let currentPlayer = 'w';

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {title: " Chess Game "});
})

let moveHistory = [];

io.on("connection", function(uniqueSocket){
    console.log("Connected");

    if(!players.white){
        players.white = uniqueSocket.id;
        uniqueSocket.emit("playerRole", "w"); //jisne abhi connected hua hai usiko msge bhejo
    }
    else if(!players.black){
        players.black = uniqueSocket.id;
        uniqueSocket.emit("playerRole", "b");
    }
    else{
        uniqueSocket.emit("spectatorRole");
    }

    uniqueSocket.on("disconnect", function(){
        let winner = null;
        //check karo ke kon disconnect hua hai
        if(uniqueSocket.id === players.white){ //agar white disconnect hua hai toh white ko delete kardo
            delete players.white;
            if(players.black){
                winner = "black";
            }
        }
        else if(uniqueSocket.id === players.black){ //agar black disconnect hua hai toh black ko delete kardo
            delete players.black;
            if(players.white){
                winner = "white";
            }
        }
        //agar spectator disconnect hua toh kuch mat karo
        if(winner){
            io.emit("gameOver", `${winner} wins by default due to opponent disconnecting.`)
        }
    });

    uniqueSocket.on("move", (move)=>{
        try{
            //turn tha white ka but black khel diya toh wahi return kardo
            if(chess.turn() === 'w' && uniqueSocket.id != players.white) return;
            if(chess.turn() === 'b' && uniqueSocket.id != players.black) return;

            const result = chess.move(move);
            if(result){
                currentPlayer = chess.turn();
                moveHistory.push(move);
                io.emit("move", move); //frontend me result bhejo
                io.emit("boardState", chess.fen());
                io.emit("moveHistory", moveHistory);

                if(chess.isCheckmate()){
                    io.emit("Checkmate", chess.turn() === 'w' ? 'Black' : 'White');
                }
            }else{
                console.log("Invalid Move: ", move);
                uniqueSocket.emit("InvalidMove", move); //sirf jisne galat khela hai usko msg jaaye ga
            }

        }
        catch(err){
            console.log(err);
            uniqueSocket.emit("Invalid Move: ", move);
        }
    })

    uniqueSocket.on("resetGame", () => {
        chess.reset();
        io.emit("boardState", chess.fen());
        io.emit("newGame");
    })
});



server.listen(3000, function() {
    console.log("Server started on PORT 3000");
})