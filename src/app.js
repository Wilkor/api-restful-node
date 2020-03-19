const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// server heroku https://doc-sockets.herokuapp.com/
io.on('connection', socket => {
  socket.on("notification", data =>{
    if(data.profileType === "admin"){
        data.products.forEach(product => {
           socket.leave(product);
            socket.join(product);
            io.to(product).emit("broadcastMessage",'Você recebeu um aviso!');
            console.log(io.sockets.adapter.rooms)
        });

    } else {
        socket.to("admin").emit("broadcastMessage");
    }
});
});

http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 4444');
});
