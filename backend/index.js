const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./utils/db')
const config = require('./utils/config')
const {info, error} = require('./utils/logger')
const {getBlogs, createBlog} = require('./controllers/blogController')


app.use(cors())
app.use(express.json())
connectDB()

app.get('/api/blogs', getBlogs)
app.post('/api/blogs', createBlog)


const PORT = config.PORT

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})