//importar la conexion del fichero mongo.js
require('./mongo') 
const Note = require('./models/Note')

//const { request } = require('express')
const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')


//const http = require('http')

//Con esta linea decimos que App soporte las request cuando se le pase un objeto y lo
// parsea el request.body para 
app.use(express.json())

//CORS middleware que permite decir a nuestra API de que origenes permitimos acceder
app.use(cors())

app.use(logger)


let notes = [{
    id: 1,
    content: 'Repasar los retos de JS de middudev',
    date: '2019-05-30T19:20:14.298Z',
    important: true
}]

//creamos un servidor y le pasamos un parametro que es un callBack(funcion que se ejecuta cada vez que le llega una request) 
/*const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})
*/

app.get('/', (request, response) =>{
    response.send('<h1>Hello Wordl</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    //si no encuentra notas devuelve un error 404
    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})



app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body
    
    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)


    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = notes.concat(newNote)

    response.status(201).json(newNote)
})

app.post('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () =>{
    console.log('Server running on port ${PORT}')
})

