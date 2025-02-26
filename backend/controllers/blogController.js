const Blog = require('../models/blog')

const getBlogs = async (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}

const createBlog = async (request, response) => {
    const {title, author, url, likes} = request.body
    console.log(title, author, url, likes)
    const blog = new Blog({title, author, url, likes})

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => {
        response.status(400).json({error: error.message})
      })
}

module.exports = {
    getBlogs, createBlog }