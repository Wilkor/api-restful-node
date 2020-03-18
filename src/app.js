const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = {};

io.on('connection', socket => {


  socket.on("notification", data =>{
    if(data.profileType === "admin"){
        data.products.forEach(product => {
           socket.leave(product);
            socket.join(product);
            socket.emit("broadcastMessage",'Você recebeu um aviso!');
            console.log(io.sockets.adapter.rooms)
        });

    } else {
        socket.to("admin").emit("broadcastMessage");
    }
});
//     let previousId;

//     const safeJoin = currentId => {
//         socket.leave(previousId);
//         socket.join(currentId);
//         previousId = currentId;
//     }

//     socket.on('getDoc', docId => {
//         safeJoin(docId);
//         socket.emit('document', documents[docId]);
//     });

//     socket.on('addDoc', doc => {

//       if(doc.profileType === "admin"){
//         doc.products.forEach(product => {
//               socket.to(product).emit("broadcastMessage", 'você recebu um aviso, verifique!');
//           });
//           console.log('sala', socket.rooms)
//       } else {
//           socket.to("admin").emit("broadcastMessage");
//       }

//         //io.emit('broadcastMessage', Object.keys(doc));
//        // socket.emit('broadcastMessage', doc);

//     });

//     socket.on('editDoc', doc => {
//         documents[doc.id] = doc;
//         socket.to(doc.id).emit('document', 'doc');

//     });

//     socket.on("login", doc => {
//       if(doc.profileType === "admin"){
//         doc.products.forEach(product => {
//               safeJoin(product);
//           });
//       } else {
//           socket.to("admin").emit("broadcastMessage");
//       }
//   });
//   socket.on("notification", data =>{

//     if(data.profileType != "admin"){
//         data.products.forEach(product => {
//             safeJoin(product);
//             socket.to(product).emit("broadcastMessage");
//         });
//     } else {
//         socket.to("admin").emit("broadcastMessage");
//     }
// });
//     io.emit('documents', Object.keys(documents));

//     console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});
