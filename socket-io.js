const express = require("express");
const http = require("http");
const path = require("path");
app = express() 

let httpServer  = require("http").createServer(app)  // server: http
let port = 9999

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/src/views'))

app.get('/', (req, res) => {
    res.render('socketio');
});

let SocketServer = require("socket.io") // server: Websocket-socket.io
const io = new SocketServer(httpServer)

// const io = require("socket.io")(httpServer)

httpServer.listen(port, () => {
    console.log('listening on : ', port);
})

io.on('connection', (socket) => {
    console.log('có 1 user đang kết nối...', socket.id)
    
    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });

    socket.on('new_message', (data) => {
        console.log('message is: ', data)
    })
})

