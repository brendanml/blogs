const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body

    console.log("hitting the backend route", username, password)

    console.log("username type is", typeof username)
  
    const user = await User.findOne({ username })

    console.log("user found?", user)

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)


    console.log("password correct?", passwordCorrect)
  
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({ token, username: user.username, name: user.name, id: user._id })
  })

module.exports = loginRouter