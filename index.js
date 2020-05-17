const express = require('express')
const app = express()
const socket = require('socket.io')
const path = require('path')


app.set('port', process.env.PORT || 4000)

app.use(express.static(path.join(__dirname,'public')))

const server = app.listen(app.get('port'),()=>{
    console.log(`Server Up on ${app.get('port')}`)
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado',socket.id);
    socket.on('mensaje',(data)=>{
        io.sockets.emit('mensaje',data)
        console.log(data)
    })
    socket.on('escribiendo',(data)=>{
        console.log('escribiendo')
        socket.broadcast.emit('escribiendo',data)
    })
});
