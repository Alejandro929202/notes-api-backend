const mongoose = require('mongoose')
const connectionString = process.env.MONGO_DB_URI


//conexion a mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log('Database connected')
    }).catch(err => {
        console.error(err)
    })




 
