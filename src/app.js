const express = require("express");
const app = express();
const http = require('http').Server(app);

var options = {
        allowUpgrades: true,
        transports: [ 'polling', 'websocket' ],
        pingTimeout: 9000,
        pingInterval: 3000,
        cookie: 'mycookie',
        httpCompression: true,
        origins: '*:*' 
};

const io = require('socket.io')(http, options);
const cors = require('cors');
const connectedUser = {}

io.origins(['http://localhost:4200']).on('connection', socket => {
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


app.use(cors())
app.use(express.json())
http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 4444');
});
