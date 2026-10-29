const express = require('express')
const { dbConnection } = require('./DB/config')
const cors = require('cors')
require('dotenv').config()



// Crear la aplicacion de express

const app = express()

//Conexion con la bd
dbConnection()

//Funcionamiento de CORS
app.use(cors())

//Directorio Publico
app.use( express.static('public') )

//Lectura y parseo de data 

app.use(express.json())


//RUTAS

//auth
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

//escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
    
} )