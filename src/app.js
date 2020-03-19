const express = require("express");
const app = express();
const http = require('http').Server(app);
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
        next();
    });

    const io = require('socket.io')(http);
    const cors = require('cors');
    const connectedUser = {}
    
 io.listen(http, {log:false, origins:'*:*'});
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


app.use(cors())
app.use(express.json())
http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 4444');
});
