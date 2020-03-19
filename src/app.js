const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
// server heroku https://doc-sockets.herokuapp.com/
app.use(cors());
app.options('*', cors());
io.on('connection', socket => {
  socket.on("notification", data =>{
    if(data.profileType === "admin"){
        data.products.forEach(product => {
            socket.join(product);
            io.to(product).emit("broadcastMessage",'Você recebeu um aviso!');
        });

    } else {
        socket.to("admin").emit("broadcastMessage");
    }
});

  socket.on("login", data =>{
    if(data.profileType === "admin"){
        data.products.forEach(product => {
            socket.join(product);
        });W

    } else {
        socket.to("admin").emit("broadcastMessage");
    }
});

});

http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 4444');
});
