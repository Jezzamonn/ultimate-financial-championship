import http from 'http';
import SocketIO from 'socket.io';
import { GameSimulator } from './game-simulator';

let server = http.createServer();
let io = new SocketIO(server);

const game = new GameSimulator();

io.on('connection', (socket) => {
    // To start with we don't know their user name
    let username = null;

    socket.on("send-state", (data) => {
        if (!data.hasOwnProperty("name")) {
            return;
        }
        username = data.name.toString();
        // ? todo: acknowledge?
    });

    socket.on('take-coin', (data) => {
        if (!data.hasOwnProperty('id')) {
            return;
        }
        game.removeCoin(data.id.toString());
    });

    socket.on('challenge-user', (data) => {
        // Send challenge to other player
    });

    socket.on('accept-challenge', (data) => {
        // Make both players join room?
    });

    socket.on('update-fight-data', (data) => {
        // Send update to other player
    });
});

function updateState() {
    game.addCoins();

    io.emit('world-update', game.getWorldObject());
}

setInterval(updateState, 1000);

// Start listening
server.listen(3000, () => {
    console.log(`Listening on 3000`);
});