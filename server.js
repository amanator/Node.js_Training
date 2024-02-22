const express = require('express')
let cors = require('cors')
const connectToMongo = require('./db');

const app = express()
let port = process.env.PORT || 8000

connectToMongo();

app.use(cors())
app.use(express.json())

// Available Routes
app.get('/', (req, res) => {
  res.send('Hello Aman!')
})

app.use('/api/notes', require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Listening at ${port}`)
})