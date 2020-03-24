const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');


io.on('connection', socket => {
  
  const productRooms =  findRooms => {
    var availableRooms = [];
    var rooms = io.sockets.adapter.rooms;
    if (rooms) {
        for (var room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
                availableRooms.push(room);
            }
        }
    }
    return availableRooms;
}
  socket.on("notification", data =>{
       const rooms =  productRooms();
       console.log(rooms);
       let count = 0;

       data.products.forEach( (product,index) => {
            if(rooms.includes(product)){
                //socket.broadcast
                console.log('produto', index);
              socket.broadcast.to(product).emit("responseLogin", {
                 id: data.id,
                 msg:', chegou um aviso para você! clique aqui para visualizar.' ,
                 contador: index
                })
          } 
     });
});
  socket.on("login", data => {
       console.log('repetições', data)
       data.products.forEach(product => {
       socket.join(product);
      });
    });

    console.log(socket.adapter.rooms)
});


app.use(cors())
app.use(express.json())
http.listen(process.env.PORT || 4444, () => {
    console.log('Listening on port 4444');
});
