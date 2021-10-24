const express = require('express')
const {spawn} = require("child_process")
const socketio = require('socket.io');
const http = require('http');
const path = require('path');


const data_router = require('./sockets/automate_data/data_sockets')


const app = express();
const server  = http.createServer(app);
const port = process.env.PORT || 3002;
const io = socketio(server,{
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

app.use(express.json());
app.set('socketio',io);



app.use(express.static(path.join(__dirname,'./client_side')))
app.use(data_router)




  



server.listen(port,() => {
    console.log("Server is up on Port " + port)
})
