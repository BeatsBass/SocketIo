const socket = io()

let mensaje = document.getElementById('mensaje')
let userName = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

btn.addEventListener('click', () => {
    const data = {
        username: userName.value,
        mensaje: mensaje.value
    }
    socket.emit('mensaje', data)
})

mensaje.addEventListener('keypress', () => {
    socket.emit('escribiendo', userName.value)
})

socket.on('mensaje', (data) => {
    output.innerHTML += `
    <div style = 'display:flex;justify-content:space-around'>
    <h5>De: ${data.username}</h5>
    <p>Mensa: ${data.mensaje}</p></div>`
    actions.innerHTML = ''
})

socket.on('escribiendo', (data) => {
    actions.innerHTML = `<p>${data} escribiendo ... </p>`
})