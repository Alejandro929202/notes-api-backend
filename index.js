//dependecia npm install dotenv para que utilice el archivo .env
require('dotenv').config()
//importar la conexion del fichero mongo.js
require('./mongo') 
const Note = require('./models/Note')

//const { request } = require('express')
const { request, response } = require('express')
const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')


//const http = require('http')

//Con esta linea decimos que App soporte las request cuando se le pase un objeto y lo
// parsea el request.body para 
app.use(express.json())

//CORS middleware que permite decir a nuestra API de que origenes permitimos acceder
app.use(cors())

app.use(logger)


// let notes = []

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
    Note.find({}).then(notes => {
        response.json(notes)
    })
    
})

app.get('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    
    Note.findById(id).then(note => {
        //si no encuentra notas devuelve un error 404
        if(note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }
    
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
    .then(result => {
        response.json(result)
    })
    .catch(err => next(err))
    
})

app.delete('/api/notes/:id', (request, response, next) => {
    const { id } = request.params
    
    Note.findByIdAndDelete(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
    const note = request.body
    
    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const newNote  = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
        
    })

    newNote.save().then(savedNote => {
        response.json(savedNote)
    }).catch(err => next(err))

    response.status(201).json(newNote)
})

//middleware control de errores next
app.use(notFound)
app.use(handleErrors)

// app.post('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id != id)
//     response.status(204).end()
// })

// app.use((request, response) => {
//     response.status(404).json({
//         error: 'Not found'
//     })
// })


const PORT = process.env.PORT 

app.listen(PORT, () =>{
    console.log('Server running on port ${PORT}')
})

