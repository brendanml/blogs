const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./utils/db')
const blogsRouter = require('./controllers/blogsRouter')
const usersRouter = require("./controllers/usersRouter")
const loginRouter = require("./controllers/loginRouter")
const {unknownEndpoint, errorHandler, tokenExtractor, userExtractor} = require('./utils/middleware')


app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', userExtractor, blogsRouter)




app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app