const logger = require('./logger')

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const reqLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name ===  'JsonWebTokenError') {    return res.status(401).json({ error: 'token invalid' })  }

}

// switched to user extractor
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')  
  // if (authorization && authorization.startsWith('Bearer ')) {    
  //     return authorization.replace('Bearer ', '')  
  // return null}
  req.body.token = authorization && authorization.startsWith('Bearer ') ? authorization.replace('Bearer ', '') : null
  next()
}

const userExtractor = async (req, res, next) => {
  console.log("user extractor is being hit")
  const authorization = req.get('authorization');
  console.log("the authorization is...", authorization)
  if(authorization) {
    const token = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    req.user = user;
    console.log("the user is...", user)
  }
  next();




};

module.exports = userExtractor;


module.exports = {
  reqLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}