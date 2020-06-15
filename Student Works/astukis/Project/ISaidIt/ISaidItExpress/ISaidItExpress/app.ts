import debug = require('debug');
import express = require('express');
import path = require('path');

const app = express();

var roomId;
var question;
var deadline;
app.use('/Chatroom.html', function (req, res, next) {  //Chatroom GET handling
    roomId = req.query.roomID;
    question = req.query.question;
    deadline = new Date(req.query.day +" "+ req.query.time);
    next();
}, express.static('public/Chatroom.html'));

app.use('/', express.static('public/'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

const io = require('socket.io')(server);

var recordedMessage =
{
    "msg": null,
    "sender": null,
    "timestamp": null
}

function removeBySocketId(socketID,players) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketID == socketID) {
            players.splice(i, 1);
        }
    }
}

function addMessageToLog(msg, sender, date,serverMessageLog) {
    var tempMsg = JSON.parse(JSON.stringify(recordedMessage));
    tempMsg.msg = msg;
    tempMsg.sender = sender;
    tempMsg.timestamp = date;
    serverMessageLog.push(tempMsg);
}

io.on('connection', (socket) => {
    socket.join(roomId);
    //Assigning room  variables
    if (io.sockets.adapter.rooms[roomId].players == null)
    {
        io.sockets.adapter.rooms[roomId].question = question;
        io.sockets.adapter.rooms[roomId].deadline = deadline;
        io.sockets.adapter.rooms[roomId].players = [];
        io.sockets.adapter.rooms[roomId].serverMessageLog = [];
    }
    var roomQuestion = io.sockets.adapter.rooms[roomId].question;
    var roomDeadline = io.sockets.adapter.rooms[roomId].deadline;
    var players = io.sockets.adapter.rooms[roomId].players;
    var serverMessageLog = io.sockets.adapter.rooms[roomId].serverMessageLog;
    //end of assigning socket variables

    console.log('a user connected room '+roomId);
    io.emit('joinedRoom', roomId);
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeBySocketId(socket.id,players);
        io.to(roomId).emit('userLeft', players);
    });
    socket.on('chat message', (msg,sender,textIsAnswer) => {
        console.log('message: ' + msg);
        var date = new Date();
        addMessageToLog(msg, sender, date, serverMessageLog);
        io.to(roomId).emit('chat message', msg, sender, date);
        if (textIsAnswer) {
            players.find(element => element.nickname == sender.nickname).answer = msg;
            io.to(roomId).emit('answerUpdated', players);
        }
    });
    socket.on('userAdded', (player) => { //user is used on client side, player in server side (to avoid conflict)
        player.socketID = socket.id;
        players.push(player);
        console.log(player.nickname + " has logged on, players: " + players.length);
        io.to(roomId).emit('userAdded', players, roomQuestion, roomDeadline);
        socket.emit('logReceived', serverMessageLog);
    });

});

