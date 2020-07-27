const cookieParser = require('cookie-parser');
const socketPassport = require('passport.socketio');
const { store } = require('../../server');
const client = require('../../models/client-model');


const  chatConfig = app => {
    const io = require('socket.io')(app);
    
    // io.use(socketPassport.authorize({
    //     key: 'connect.sid',
    //     secret: process.env.SESSION_SECRET,
    //     cookieParser,
    //     store
    // }));

    const users = {};

    io.on('connection', async socket => {
        const user = socket.request.user ? socket.request.user : socket;
        if (!users[user.id]) {
            users[user.id] = socket.id;
        }
        console.log(users);

        socket.emit("init", socket.id);

        socket.emit('usersOnline', [...Object.keys(users).map(user => users[user])].filter( userID => userID != user.id ));

        // if( user.type === 'client' ){
        //     try {
        //         socket.emit('aClient');
        //         const usersCoach = await client.getCoach( user.id );
        //         if( users[usersCoach.id] ? true : false ) socket.emit('usersOnline', { [usersCoach.id]: users[usersCoach.id] });
        //         else {
        //             socket.emit('noCoach');
        //         }
        //     } catch(err) {
        //         console.error(err);
        //     }
        // }
        // else {
        //     if( user.type === 'coach '){
        //         socket.emit('aCoach');
        //     }
        //     socket.emit('usersOnline', [...Object.keys(users).map(user => users[user])]);
        // }

        socket.on('disconnect', () => {
            delete users[user.id];
        });

        socket.on('easy', () => console.log('SO EASY'))

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit('callRequest', {signal: data.signalData, from: data.from});
        })

        socket.on("acceptCall", (data) => {
            io.to(data.to).emit('callAccepted', data.signal);
        })
    });
}


module.exports = chatConfig;