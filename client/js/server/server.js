import http from 'http';
import SocketIO from 'socket.io';
import { GameSimulator } from './game-simulator';

let server = http.createServer();
let io = new SocketIO(server);

const game = new GameSimulator();

io.on('connection', (socket) => {
    // To start with we don't know their user name
    let username = null;

    socket.on("player-update", (data) => {
        console.log(`player-update: ${JSON.stringify(data)}`);
        if (!data.hasOwnProperty("id") ||
            !data.hasOwnProperty("x") ||
            !data.hasOwnProperty("y")) {
            return;
        }
        game.updatePlayer(data);
    });

    socket.on('take-coin', (data) => {
        console.log(`take-coin: ${JSON.stringify(data)}`);
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

function clearPlayers() {
    // Instead of just clearing it, we keep the top 5 so they stay in the
    // highscores, but then we update those to be really far away.
    //
    // It might look weird if you're watching at that moment AND one of these
    // best players is still playing but it doesn't happen often.
    game.players.sort((a, b) => a.money - b.money);
    game.players = game.players.slice(0, 5);
    for (const player of game.players) {
        player.x = 100000;
        player.y = 100000;
        player.dx = 100000;
        player.dy = 100000;
    }
}

setInterval(updateState, 1000);
// We need to do this or the server will be overloaded with empty players!
setInterval(clearPlayers, 60 * 60 * 1000)

// Start listening
server.listen(3000, () => {
    console.log(`Listening on 3000`);
});