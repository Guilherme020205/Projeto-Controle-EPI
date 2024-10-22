const express = require('express')
const port = 3000
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
var cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/', routes)

app.listen(port, () => {
    console.log('Servidor rodando!')
})