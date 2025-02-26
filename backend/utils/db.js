const mongoose = require('mongoose')
const config = require('./config')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI)
    console.log("MongoDB connected")
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl)

module.exports = connectDB