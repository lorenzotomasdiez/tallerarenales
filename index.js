const express = require('express')
const dbConecction = require('./database/config')
const cors = require('cors')
const env = process.env

//Create Server
const app = express()

//DB
dbConecction()

//CORS
app.use(cors())

//Public 
app.use(express.static('public'))

//Read & parse of body
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/tramites', require('./routes/tramites'))

//Listen Req
app.listen(env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${env.PORT}`)
})