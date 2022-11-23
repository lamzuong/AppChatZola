const express = require('express');
const app = express();
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 500000 }));
const helmet = require('helmet');
const morgan = require('morgan');
var cors = require('cors');

app.use(cors());
const authRoute = require('./routers/auth');
const usersRoute = require('./routers/users');
const conversationRoute = require('./routers/conversation');
const messageRoute = require('./routers/message');

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/zola/auth', authRoute);
app.use('/zola/users', usersRoute);
app.use('/zola/conversation', conversationRoute);
app.use('/zola/message', messageRoute);

app.use('/', (req, res) => {
    res.send('Hello');
});

var server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

io.on('connection', (socket) => {
    socket.on('send-to-server', (data) => {
        io.emit('server-send-to-client', data); //Gửi tất cả
    });
    socket.on('remove-to-server', (data) => {
        io.emit('server-remove-to-client', data); //Gửi tất cả
    });
    socket.on('send-to-out', (data) => {
        io.emit('server-send-to-out', data); //Gửi tất cả
    });
    socket.on('send-to-addMem', (data) => {
        io.emit('server-send-to-addMem', data); //Gửi tất cả
    });
    socket.on('send-to-addGroup', (data) => {
        io.emit('server-send-to-addGroup', data); //Gửi tất cả
    });
    socket.on('send-to-deleteGroup', (data) => {
        io.emit('server-send-to-deleteGroup', data); //Gửi tất cả
    });
    socket.on('send-to-authorized', (data) => {
        io.emit('server-send-to-authorized', data); //Gửi tất cả
    });
    socket.on('send-to-edit', (data) => {
        io.emit('server-send-to-edit', data); //Gửi tất cả
    });

    // call video
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', (data) => {
        io.emit('callUser', data);
    });

    socket.on('answerCall', (data) => {
        io.emit('callAccepted', data);
    });

    socket.on('leaveCall', (data) => {
        io.emit('leaveCall', data);
    });
});

server.listen(8000, () => {
    console.log('Backend is running');
});
