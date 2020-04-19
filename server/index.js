var express=require('express');
var app= express();
var server=require('http').Server(app);
var io= require('socket.io')(server);

app.use(express.static('client'));

let messages= [{
    id:1,
    text:'Bienvenido al chat privado...',
    nickname:'Bot'
}]

io.on('connection', function(socket){
console.log('usuario ' + socket.handshake.address + ' conectado...');

socket.emit('messages',messages);

socket.on('add-message',function(data){
  messages.push(data);
  io.sockets.emit('messages',messages);
})

});

server.listen(6677,function(){
    console.log('server en localhost:6677');
});
