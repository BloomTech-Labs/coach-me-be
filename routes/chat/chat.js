const app = require('express')();
const PORT = process.env.PORT || 5000;
const base64id = require('base64id');

const  chatConfig = app => {
    const io = require('socket.io')(app);
    const users = {};
    io.engine.generateId = req =>{ 
        try {
            return req.session.passport.user.id
        } catch {
            return base64id.generateId();
        }}

    io.on('connection', socket => {
        if (!users[socket.id]) {
            users[socket.id] = socket.id;
        }
        console.log(users);

        socket.emit("init", socket.id);

        socket.emit("usersOnline", users);

        socket.on('disconnect', () => {
            delete users[socket.id];
        });

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit('callRequest', {signal: data.signalData, from: data.from});
        })

        socket.on("acceptCall", (data) => {
            io.to(data.to).emit('callAccepted', data.signal);
        })
    });
}


module.exports = chatConfig;