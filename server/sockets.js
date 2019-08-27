module.exports = io => {
  io.on('connection', socket => {
    socket.on('userConnected', userCoords => {
      console.log('Im in the broadcast');
      socket.broadcast.emit('showNewUser', userCoords);
    });
  });
}