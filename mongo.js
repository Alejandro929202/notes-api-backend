const mongoose = require('mongoose')
const connectionString = 'mongodb+srv://midudev:413x@cluster0.qbnib.mongodb.net/alexBD?retryWrites=true&w=majority'


//conexion a mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.error(err)
    })




 
