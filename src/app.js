const app = require('express')();
const http = require('http').Server(app, { origins: ['https://portalspa-ti.safra.com.br/','localhost:4200']});
const io = require('socket.io')(http);
var cors = require('cors')

var whitelist = ['https://portalspa-ti.safra.com.br', 'localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


io.on('connection',  cors(corsOptions), socket => {
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
