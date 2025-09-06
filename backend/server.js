const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo connected'))
  .catch((err) => console.error('Mongo connection error', err))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/items', require('./routes/items'))
app.use('/api/cart', require('./routes/cart'))

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
