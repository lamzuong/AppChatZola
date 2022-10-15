const express = require('express')

const app = express();
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
var cors = require('cors')

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
    res.send("Hello")
})

app.listen(8000, () => {
    console.log('Backend is running');
})
 