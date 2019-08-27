const express = require('express');
const app = express();
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

// Set socket server
const socketServer = http.createServer(app);
const io = socketIO(socketServer);
require('./sockets')(io);

// setting templates engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes'));



socketServer.listen(3000, () => console.log('Server running on port 3000'));