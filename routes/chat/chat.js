const cookieParser = require('cookie-parser');
const socketPassport = require('passport.socketio');
const { store } = require('../../server');
const client = require('../../models/client-model');


const  chatConfig = app => {
    const io = require('socket.io')(app);

    io.use(socketPassport.authorize({
        key: 'connect.sid',
        secret: process.env.SESSION_SECRET,
        cookieParser,
        store
    }));

    const users = {};

    io.on('connection', async socket => {
        const { user } = socket.request;
        console.log(user);
        if (!users[user.id]) {
            users[user.id] = socket.id;
        }
        console.log(users);

        socket.emit("init", socket.id);

        if( user.type === 'client' ){
            try {
                const usersCoach = await client.getCoach( user.id );
                console.log(usersCoach)
                if( users[usersCoach.id] ? true : false ) socket.emit('usersOnline', { [usersCoach.id]: users[usersCoach.id] });
            } catch(err) {
                console.error(err);
            }
        }

        socket.on('disconnect', () => {
            delete users[user.id];
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