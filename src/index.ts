import {join} from 'path'
import express from 'express'
import {Server} from 'socket.io'
import http from 'http'

const port = 5000
const app = express()
const server = http.createServer(app)
const io = new Server(server)

interface Chat {
    sender: string,
    message: string
}

io.on('connection', socket => {
    console.log('Connect');
    socket.on('send', ({sender, message}: Chat) => {        
        io.emit('receive', {sender, message})
    })

    socket.on('notification', (user: string) => {
        socket.broadcast.emit('notification', user)
    })
})

app.get('/chat', (req, res) => {
    res.sendFile(join(__dirname, '../', './public', './chat.html'))
})

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../', './public', './username.html'))
})

,server.listen(port, () => {
    console.log('http://localhost:' + port);
})